import React from "react";
import './ToggleSTTButton.css';

const ToggleSTTButton = ( { speechButton, setStateMessage } ) => {

    // const handleButtonClick = () => {

    //     const data = {
    //         areaSize: "(4,5)"
    //     };


    //     fetch("http://localhost:3000/",

    //     {
    //         method: "POST",
    //         headers: { "Content-Type": "SomeFile/json" },
    //         body: JSON.stringify(data)
    //     }

    //     ).then(Response => {

    //         if (!Response.ok) throw new Error("Network Not OK");
    //         return Response.json();

    //     });

    // };


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