import React from "react";
import './ResumeButton.css'
import { FaPlay } from "react-icons/fa";

// props = { setRenderButtonState }
const ResumeButton = function(props) {

    const onEventButtonClicked = function() {
        props.setRenderButtonState("PauseButton");
    };


    return (
        <button className="ResumeButton" onClick={onEventButtonClicked}>
            <FaPlay className="playIcon"/>
        </button>
    );

};

export default ResumeButton;