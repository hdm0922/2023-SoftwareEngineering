import React from "react";
import "./GenerateAreaButton.css"
import UserInputPanel from "../UserInputPanelComponents/UserInputPanel";

const GenerateAreaButton = {

};

GenerateAreaButton.ReactElement = () => {

    return (

        <button className="GenerateAreaButton"
                onClick={GenerateAreaButton.handleButtonClick}>
            <span>Generate</span>
        </button>

    );
    
};


GenerateAreaButton.handleButtonClick = function() {

    console.log( UserInputPanel.inputData );

};

export default GenerateAreaButton;


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

