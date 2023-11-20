import React, { useEffect, useState } from "react";
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



    const [simulationRunning, setSimulationRunning] = useState(null);



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
                pauseSimulation();
                props.setSTTButtonState("Running");
                break;

            case "PauseButton":
                resumeSimulation();
                props.setSTTButtonState("Disabled");

                break;

            default :
                break;
        }
    };


    const moveRobot = function() {

        const nextMovement = APIRequestHandler.fetchRobotMovement();
        
        switch (nextMovement.robotMovement) {

            case "Stop":
                break;

            case "Rotate" :
                props.simulationData.updateFunctions.setrobotRotationDegree(
                    prevRotationDeg => ((prevRotationDeg + 90) % 360)
                );
                break;

            case "Move" :
                
                props.simulationData.updateFunctions.updateItemsToRender("",
                    props.simulationData.robot.robotPosition.x,
                    props.simulationData.robot.robotPosition.y
                );

                const newRobotPosition = props.simulationData.robot.robotPosition;

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


    const resumeSimulation = function() {
        const running = setInterval(() => { moveRobot(); }, 1000);
        setSimulationRunning(running);
    }

    const pauseSimulation = function() {
        clearInterval(simulationRunning);
        setSimulationRunning(null);
    }

    // useEffect(() => {
    //     if (simulationRunning) clearInterval(simulationRunning); },
    //        [simulationRunning]);

    useEffect(  () => { if (simulationRunning) {
        return  () => { clearInterval(simulationRunning); };
        }}, [simulationRunning]);


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

            {/* <button onClick={MoveRobot} style={{position:"absolute"}}/> */}

            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        setInitialData={props.simulationData.updateFunctions.setInitialData}
                                        userInputData = {{areaSizeUserInput, startPositionUserInput,
                                                        importantPositionsUserInput, hazardPositionsUserInput}}
                    />}


                {(renderButton === "ResumeButton") &&
                    <ResumeButton setRenderButtonState={setRenderButtonState} />}

                {(renderButton === "PauseButton" ) &&
                    <PauseButton setRenderButtonState={setRenderButtonState} />}

            </div>


        </div>

    );

};


export default MainPanel;