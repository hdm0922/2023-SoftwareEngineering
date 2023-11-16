import React, { useState } from "react";
import './MainPanel.css'

import UserInputPanel from "./renderpanel/UserInputPanel";
import SimulatePanel from "./renderpanel/SimulatePanel";

import ResumeButton from "./renderbutton/ResumeButton";
import PauseButton from "./renderbutton/PauseButton";
import GenerateAreaButton from "./renderbutton/GenerateAreaButton";


// props = { setSTTButtonState }
const MainPanel = function(props) {

    const [renderPanel, setRenderPanel] = useState("UserInputPanel");
    const [renderButton, setRenderButton] = useState("GenerateAreaButton");


    const [areaSize, setAreaSize] = useState("");
    const [startPosition, setStartPosition] = useState("");
    const [importantPositions, setImportantPositions] = useState("");
    const [hazardPositions, setHazardPositions] = useState("");


    const setRenderPanelState = function(newPanel) {

        setRenderPanel(newPanel);

    };


    const setRenderButtonState = function(newButton) {

        setRenderButton(newButton);

        switch (newButton) {

            case "ResumeButton": {
                props.setSTTButtonState("Running");
            }   break;

            case "PauseButton": {
                props.setSTTButtonState("Disabled");
            }   break;

        }
    };


    return (

        <div className="MainPanel">

            {(renderPanel === "UserInputPanel") &&
             <UserInputPanel userInputDataSetters={{setAreaSize, setStartPosition,
                                                    setImportantPositions, setHazardPositions}}/>}

            {(renderPanel === "SimulatePanel") &&
             <SimulatePanel />}


            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        userInputData = {{areaSize, startPosition,
                                                        importantPositions, hazardPositions}}/>}


                {(renderButton === "ResumeButton") &&
                    <ResumeButton setRenderButtonState={setRenderButtonState}/>}

                {(renderButton === "PauseButton" ) &&
                    <PauseButton setRenderButtonState={setRenderButtonState}/>}

            </div>


        </div>

    );

};


export default MainPanel;