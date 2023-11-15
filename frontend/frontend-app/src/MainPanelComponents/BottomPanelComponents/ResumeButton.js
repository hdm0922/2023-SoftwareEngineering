import React from "react";
import './ResumeButton.css'
import { FaPlay } from "react-icons/fa";
// import { FaPause } from "react-icons/fa6";

const ResumeButton = () => {

    return (

        <button className="ResumeButton">
            <FaPlay className="playIcon"/>
        </button>

    );

};

export default ResumeButton;