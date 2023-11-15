import React from "react";
import './ToggleSTTButton.css';

const ToggleSTTButton = ( { speechButton, setStateMessage } ) => {


    const toggleSpeechButton = () => {

        if (!speechButton.activated) { speechButton.Activate(setStateMessage); }
        else { speechButton.Deactivate(setStateMessage); }

    };


    return (
        <button className="ToggleSTTButton"
                onClick={toggleSpeechButton}>
            Toggle
        </button>
    );

};

export default ToggleSTTButton;