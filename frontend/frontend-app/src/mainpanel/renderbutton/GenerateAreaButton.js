import React from "react";
import './GenerateAreaButton.css'

// props = { setRenderPanelState, setRenderButtonState, userInputData };
const GenerateAreaButton = function(props) {

    const onEventButtonClicked = function() {

        // send data to server
        console.log(props.userInputData);

        props.setRenderPanelState("SimulatePanel");
        props.setRenderButtonState("ResumeButton");
    };

    return (

        <button className="GenerateAreaButton"
                onClick={onEventButtonClicked}>
            <span>Generate</span>
        </button>

    );

};


export default GenerateAreaButton;