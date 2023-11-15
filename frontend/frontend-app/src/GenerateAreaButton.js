import React from "react";
import SpeechToTextButton from "./SpeechToTextButton";
import './GenerateAreaButton.css';

const GenerateAreaButton = ( { speechButtonActivated, setSpeechButtonActivated, setStateMessage } ) => {

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

        if (speechButtonActivated) { SpeechToTextButton.Deactivate(speechButtonActivated, setSpeechButtonActivated, setStateMessage); }
        else { SpeechToTextButton.Activate(speechButtonActivated, setSpeechButtonActivated, setStateMessage); }

    };


    return (
        <button className="GenerateAreaButton"
                onClick={toggleSpeechButton}>
            Toggle
        </button>
    );

};

export default GenerateAreaButton;