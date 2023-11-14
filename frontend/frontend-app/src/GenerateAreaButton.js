import React from "react";
import './GenerateAreaButton.css';

const GenerateAreaButton = () => {

    const handleButtonClick = () => {

        const data = {
            areaSize: "(4,5)"
        };


        fetch("http://localhost:3000/",

        {
            method: "POST",
            headers: { "Content-Type": "SomeFile/json" },
            body: JSON.stringify(data)
        }

        ).then(Response => {

            if (!Response.ok) throw new Error("Network Not OK");
            return Response.json();

        });

    };

    return (
        <button className="GenerateAreaButton" onClick={handleButtonClick} > Generate </button>
    );

};

export default GenerateAreaButton;