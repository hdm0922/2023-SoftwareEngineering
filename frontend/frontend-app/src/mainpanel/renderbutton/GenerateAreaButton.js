import React from "react";
import './GenerateAreaButton.css'
import APIRequestHandler from "../../APIRequestHandler";

// props = { setRenderPanelState, setRenderButtonState, userInputData };
const GenerateAreaButton = function(props) {

    const onEventButtonClicked = function() {


        // send data to server
        const { path } = APIRequestHandler.generatePath(props.userInputData);


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