import React, { useState } from "react";
import './MainPanel.css'

import UserInputPanel from "./renderpanel/UserInputPanel";
import SimulatePanel from "./renderpanel/SimulatePanel";

import ResumeButton from "./renderbutton/ResumeButton";
import PauseButton from "./renderbutton/PauseButton";
import GenerateAreaButton from "./renderbutton/GenerateAreaButton";

import APIRequestHandler from "../APIRequestHandler";





/*
props = { setSTTButtonState: Function, simulationData: Object }

simulationData = { areaSize: Object, robot: Object, itemsToRender: Array2D<Object>,
                    updateFunctions: Object }
                    
updateFunctions = { setInitialData: Function, updateItemsToRender: Function,
                    setrobotRotationDegree: Function, setRobotPosition: Function }
*/
const MainPanel = function(props) {

    const [renderPanel, setRenderPanel] = useState("UserInputPanel");
    const [renderButton, setRenderButton] = useState("GenerateAreaButton");
    // const [simulationRunning, setSimulationRunning] = useState(false);



    const [areaSizeUserInput, setAreaSizeUserInput] = useState("");
    const [startPositionUserInput, setStartPositionUserInput] = useState("");
    const [importantPositionsUserInput, setImportantPositionsUserInput] = useState("");
    const [hazardPositionsUserInput, setHazardPositionsUserInput] = useState("");




    const setRenderPanelState = function(newPanel) {

        setRenderPanel(newPanel);

        switch (newPanel) {

            case "SimulatePanel" :

                break;

            default :
                break;
        }
    };

    const setRenderButtonState = function(newButton) {

        setRenderButton(newButton);

        switch (newButton) {

            case "ResumeButton":
                props.setSTTButtonState("Running");
                break;

            case "PauseButton":
                props.setSTTButtonState("Disabled");
                break;

            default :
                break;
        }
    };




    const MoveRobot = function() {

        const nextMovement = APIRequestHandler.fetchRobotMovement();
        
        switch (nextMovement.robotMovement) {

            case "Stop":
                break;

            case "Rotate" :
                props.simulationData.updateFunctions.setrobotRotationDegree(
                    (props.simulationData.robot.robotRotationDegree + 90) % 360
                );
                break;

            case "Move" :
                
                props.simulationData.updateFunctions.updateItemsToRender("",
                    props.simulationData.robot.robotPosition.x,
                    props.simulationData.robot.robotPosition.y
                );

                const newRobotPosition = {x: props.simulationData.robot.robotPosition.x,
                                          y: props.simulationData.robot.robotPosition.y};
                switch (props.simulationData.robot.robotRotationDegree) {
                    case 0      : newRobotPosition.y++; break;
                    case 90     : newRobotPosition.x++; break;
                    case 180    : newRobotPosition.y--; break;
                    case 270    : newRobotPosition.x--; break;
                    default     :                       break;
                }

                props.simulationData.updateFunctions.updateItemsToRender(
                    "Robot", newRobotPosition.x, newRobotPosition.y
                );

                props.simulationData.updateFunctions.setRobotPosition(newRobotPosition);
                break;

            default :
                break;
        }
    };



    return (

        <div className="MainPanel">

            {(renderPanel === "UserInputPanel") &&
             <UserInputPanel userInputDataSetters={{setAreaSizeUserInput, setStartPositionUserInput,
                                                    setImportantPositionsUserInput, setHazardPositionsUserInput}}/>}

            {(renderPanel === "SimulatePanel") &&
             <SimulatePanel areaSize            ={props.simulationData.areaSize}
                            robotPath           ={props.simulationData.robot.robotPath}
                            robotRotationDegree ={props.simulationData.robot.robotRotationDegree}
                            itemsToRender       ={props.simulationData.itemsToRender}/> }

            <button onClick={MoveRobot} style={{position:"absolute"}}/>

            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        setInitialData={props.simulationData.updateFunctions.setInitialData}
                                        userInputData = {{areaSizeUserInput, startPositionUserInput,
                                                        importantPositionsUserInput, hazardPositionsUserInput}}/>}


                {(renderButton === "ResumeButton") &&
                    <ResumeButton setRenderButtonState={setRenderButtonState}/>}

                {(renderButton === "PauseButton" ) &&
                    <PauseButton setRenderButtonState={setRenderButtonState}/>}

            </div>


        </div>

    );

};


export default MainPanel;