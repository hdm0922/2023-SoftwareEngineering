import React from "react";
import './StateMessageBox.css'
import { PiWarningBold } from "react-icons/pi";


const StateMessageBox = ({ message }) => {

    return (

        <div className="messageBox">
            <PiWarningBold className="icon" />
            <span className="message">{message} </span>
        </div>

    );

};

export default StateMessageBox;