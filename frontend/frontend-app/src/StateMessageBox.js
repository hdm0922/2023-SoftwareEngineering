import React from "react";
import './StateMessageBox.css'
import { PiWarningBold } from "react-icons/pi";

// props = { stateMessage };
const StateMessageBox = function(props) {
    return (
        <div className="messageBox">
            <PiWarningBold className="icon" />
            <span className="message">{props.stateMessage} </span>
        </div>
    );
};

export default StateMessageBox;