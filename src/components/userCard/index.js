import React from "react";
import { data } from "../../data/data";
import { createTeam } from "../../redux/Actions/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useState, useEffect } from "react";
import "./styles.css";

const UserCard = ({ firstname, gender, photo, avialable, domain, handleButtonClick, showCreateTeam }) => {
    const teamData = useSelector((state) => state.TeamMembers.teamData);

    const [isAvialable, setIsAvialable] = useState(null);
    useEffect(() => {
        if (avialable === true) {
            setIsAvialable(true);
        } else {
            setIsAvialable(false);
        }
    }, []);
    const dispatch = useDispatch();

    const handleCreateTeamClick = () => {
       

        if (teamData.filter((item) => item.domain === domain).length > 0) {
            handleButtonClick(false);
            alert("You cant make team with same domain")
            
        } else {
            const data = {
                firstname: firstname,
                gender: gender,
                photo: photo,
                avialable: avialable,
                domain: domain,
            };
            alert("Team Created Succesfully")

            dispatch(createTeam(data));
            handleButtonClick(true);
        }
    };

    return (
        <div className="userCard">
            <div className="imagediv">
                <img className="image" src={photo} alt="User" />{" "}
            </div>
            <div className="user-details">
                <hr style={{ opacity: "0.2" }} />

                <div className="namediv">
                    <p className="firstname">
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Name:</span> {firstname}
                    </p>
                    <p className="gender">
                        {" "}
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Gender:</span> {gender}
                    </p>
                    <p className="domain">
                        {" "}
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Domain:</span> {domain}
                    </p>

                    {showCreateTeam && (
                        <div className="CreateButtonDiv">
                            {isAvialable && <p className="avilabletext"> *Available</p>}
                            {!isAvialable && (
                                <p className="unavilabletext" style={{ display: "flex", justifyContent: "center" }}>
                                    {" "}
                                    *Not Available
                                </p>
                            )}
                            {isAvialable && (
                                <button className="button" onClick={() => handleCreateTeamClick()}>
                                 <p className="butntext">Create Team</p>   
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
