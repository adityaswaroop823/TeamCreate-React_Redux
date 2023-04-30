import React from "react";
import { useEffect, useState } from "react";
import PopupModal from "./components/PopupModal";
import UserCard from "./components/userCard";
import { makeStyles } from "@mui/styles";
import { data } from "./data/data";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
const Appmain = () => {
    const teamData = useSelector((state) => state.TeamMembers.teamData);
    const [searchText, setSearchText] = useState("");
    const [dummyData, setDummyData] = useState(data);
    const [gender, setGender] = useState(null);
    const [isPopup, setIsPopup] = useState(null);
    const [filterDomain, setFilterDomain] = useState("");
    const [filterGener, setFilterGender] = useState("");
    const [availability, setAvailability] = useState("");
    const classes = useStyles();

    const initalRange = {
        start: 0,
        end: 20,
    };

    const [indexRange, setIndexRange] = useState(initalRange);
    const [domain, setDomain] = useState(null);

    useEffect(() => {
        if (gender === null) initalFilterData();
    });
    useEffect(() => {
        console.log(dummyData, "aaaa");
    }, [dummyData]);
    const initalFilterData = () => {
        const mySet1 = new Set();
        const mySet2 = new Set();

        data.map((item, index) => {
            return mySet1.add(item.gender);
        });
        data.map((item, index) => {
            return mySet2.add(item.domain);
        });
        setGender([...mySet1]);
        setDomain([...mySet2]);
        console.log(mySet2);
        console.log(mySet1);
    };

    const handleSearch = (e) => {
        console.log(e.target.value.toLowerCase());
        setSearchText(e.target.value.toLowerCase());
    };
    const search = () => {
        const filtered = data.filter((data) => String(data.first_name.toLowerCase()).startsWith(searchText));
        console.log(filtered);
        setDummyData(filtered);
        finalFilter(filtered);
    };
    const finalFilter = (filtered) => {
        setIndexRange(initalRange);
        console.log(filterDomain);
        console.log(filterGener);
        console.log(availability);
        const dommy = filtered.filter((data) =>
            availability.length != 0
                ? data.available.toString() == availability
                : true && filterGener.length != 0
                ? data.gender == filterGener
                : true && filterDomain.length != 0
                ? data.domain == filterDomain
                : true
        );
        console.log(dommy, "ol");
        if (filterDomain.length || filterGener.length || availability.length) setDummyData(dommy);
    };
    const handleFilter = (e, type) => {
        console.log(e.target.value);
        if (type === "gender") {
            setFilterGender(e.target.value);
        } else if (type === "available") {
            setAvailability(e.target.value);
        } else if (type === "domain") {
            setFilterDomain(e.target.value);
        }
    };

    const handleCardClick = (showpopup) => {
        console.log("showpopup", showpopup);
        setIsPopup(true);
    };
    const handleclosePopup = () => {
        setIsPopup(false);
    };

    function handlePagination(e, v) {
        setIndexRange({
            start: (v - 1) * 20,
            end: (v - 1) * 20 + 20,
        });
        window.scrollTo(0, 0);
    }

    return (
        <div className={classes.maindiv}>
            <div className={classes.upperfilterdiv}>
                <div>
                    <select onChange={(e) => handleFilter(e, "gender")} placeholder="Gender">
                        {gender &&
                            gender.map((item, index) => {
                                return (
                                    <>
                                        <option value="" disabled selected hidden>
                                            Select Gender
                                        </option>
                                        <option onChange={search} value={item} key={index}>
                                            {item}
                                        </option>
                                    </>
                                );
                            })}
                    </select>
                    <select onChange={(e) => handleFilter(e, "available")}>
                        <option value="" disabled selected hidden>
                            Select Avialablity
                        </option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    <select onChange={(e) => handleFilter(e, "domain")}>
                        {domain &&
                            domain.map((item, index) => {
                                return (
                                    <>
                                        <option value="" disabled selected hidden>
                                            Select Domain
                                        </option>
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    </>
                                );
                            })}
                    </select>
                </div>
                <div>
                    <input onChange={(e) => handleSearch(e)} placeholder="Searh By Name"></input>
                </div>
            </div>
            <div className={classes.filterbtndiv}>
                <button onClick={search} className={classes.filterbutton}>
                    Filter
                </button>
            </div>
            <div className={classes.usercardDiv}>
                {dummyData &&
                    dummyData.slice(indexRange.start, indexRange.end).map((item, index) => {
                        return (
                            <UserCard
                                key={index}
                                firstname={item.first_name + " " + item.last_name}
                                gender={item.gender}
                                photo={item.avatar}
                                avialable={item.available}
                                domain={item.domain}
                                handleButtonClick={handleCardClick}
                                showCreateTeam={true}
                            />
                        );
                    })}

                {isPopup && (
                    <PopupModal isOpen={true} handleclose={handleclosePopup}>
                        <div className={classes.modalContainer}>
                            {teamData &&
                                teamData
                                    .filter((item, index, arr) => {
                                        // check if item domain is different from previous item domain
                                        return index === 0 || item.domain !== arr[index - 1].domain;
                                    })
                                    .map((item, index) => {
                                        return (
                                            <div className={classes.modalDiv}>
                                                <UserCard
                                                    key={index}
                                                    firstname={item.firstname}
                                                    gender={item.gender}
                                                    photo={item.photo}
                                                    avialable={item.available}
                                                    domain={item.domain}
                                                    handleButtonClick={handleCardClick}
                                                    showCreateTeam={false}
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                    </PopupModal>
                )}
            </div>

            <Pagination
                className={classes.pagination}
                count={Math.ceil(dummyData.length / 20)}
                onChange={handlePagination}
            />
        </div>
    );
};

export default Appmain;
const useStyles = makeStyles((theme) => ({
    maindiv: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "22px",
        justifyContent: "center",
        margin: "0px auto",
        background: "#FFF7F0",
    },
    heading: {
        fontSize: "20px",
        display: "flex",
        textAlign: "center",
        fontWeight: 500,
    },
    modalDiv: {},
    headingDiv: {},
    upperfilterdiv: {
        display: "flex",
        justifyContent: "center",
        width: "70%",
        margin: "0px auto",
    },
    filterbutton: {
        height: "35px",
        width: "100px",
     background:"grey",
     borderRadius:"12px",
     color:"white",
     border:"none"
    },
    usercardDiv: {
        width: "70%",
        display: "flex",
        flexWrap: "wrap",
        gap: "22px",
        justifyContent: "center",
        margin: "0px auto",
        background: "#FFF7F0",
    },
    modalContainer: {
        display: "flex",
        width: "80%",
        flexWrap: "wrap",
        gap: "20px",
        overflowX: "scroll",
        padding: "50px",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        marginTop: "20px",
    },
    filterbtndiv: {
        display: "flex",
        justifyContent: "center",
       
    },
}));
