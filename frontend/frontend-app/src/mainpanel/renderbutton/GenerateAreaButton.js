import React from "react";
import './GenerateAreaButton.css'
import APIRequestHandler from "../../APIRequestHandler";
import Parser from "../../Parser";

// props = { setRenderPanelState: Function, setRenderButtonState: Function, userInputData: Object };
const GenerateAreaButton = function(props) {

    const onEventButtonClicked = function() {


        // 서버에 user Input을 주고, robotPathData를 수신한다.
        const robotPathData = APIRequestHandler.generatePath(props.userInputData);
        const destinationsArray = Parser.parseRobotPath(robotPathData.path);

        

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