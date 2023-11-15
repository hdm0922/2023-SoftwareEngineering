import React from "react";
import './GenerateAreaButton.css';

const GenerateAreaButton = ( { toggleFunction } ) => {

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


    const toggleSpeechButton = () => { toggleFunction(prevState => !prevState); };


    return (
        <button className="GenerateAreaButton"
                onClick={toggleSpeechButton}>
            Toggle
        </button>
    );

};

export default GenerateAreaButton;