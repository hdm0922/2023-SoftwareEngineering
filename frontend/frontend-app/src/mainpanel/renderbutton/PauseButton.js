import React from "react";
import './PauseButton.css'
import { FaPause } from "react-icons/fa6";

// props = { setRenderButtonState };
const PauseButton = function(props) {

    const onEventButtonClicked = function() {

        props.setRenderButtonState("ResumeButton");

    };

    return (

        <button className="PauseButton" onClick={onEventButtonClicked}>
            <FaPause className="pauseIcon" />
        </button>

    );
};

export default PauseButton;