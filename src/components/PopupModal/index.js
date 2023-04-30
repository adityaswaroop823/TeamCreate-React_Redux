import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { icons } from "../../assets/icons.js";
import { fontWeight } from "@mui/system";

const PopUpModal = ({ children, handleclose = false, isOpen = false }) => {
    const classes = useStyles();
    const teamData = useSelector((state) => state.TeamMembers.teamData);

    return (
        <div>
            <Modal open={isOpen} className={classes.modal}>
                <body>
                    {" "}
                    <div className={classes.modalStyle}>

                        <div className={classes.closediv}>
                            <img onClick={handleclose} src={icons.closeIcon}></img>
                        </div>
                      
                        {children}
                       
                    </div>

                </body>
            </Modal>
        </div>
    );
};

export default PopUpModal;
const useStyles = makeStyles((theme) => ({
    modal: {
        width: "80%",
        margin: "0px auto",
        display: "inline-block",
        verticalAlign: "middle",
    },
   
    modalStyle: {
        margin: "auto",
        height: "600px",
        width: "80%",
        backgroundColor: "#808080",
        margin: "0px auto",
        display: "flex",
        flexWrap: "wrap",
        overflowX: "scroll",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        border: "none",
        outline: "none",
    },
    leftdiv: {
        maxWidth: "320px",
        height: "100%",
        minWidth: "300px",
        // backgroundColor: "red",
        display: "none",
        "@media (max-width: 1280px)": {
            display: "none",
        },
    },
    rightdiv: {
        display: "none",
        "@media (max-width: 1280px)": {
            display: "none",
        },
    },
    closediv: {
        width: "80%",
        display: "flex",
        justifyContent: "flex-end",
        // backgroundColor: "red",
        margin: "0px auto",
    },
}));
