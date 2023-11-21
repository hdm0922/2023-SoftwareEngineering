import React, { useEffect, useState } from "react";
import './MainPanel.css'

import UserInputPanel from "./renderpanel/UserInputPanel";
import SimulatePanel from "./renderpanel/SimulatePanel";

import GenerateAreaButton from "./renderbutton/GenerateAreaButton";
import ResumeButton from "./renderbutton/ResumeButton";
import PauseButton from "./renderbutton/PauseButton";
import RetryButton from "./renderbutton/RetryButton";

import APIRequestHandler from "../APIRequestHandler";
import Parser from "../Parser";
import Helper from "../Helper";




/*
props = { setSTTButtonState: Function, simulationData: Object }

simulationData = { areaSize: Object, robot: Object, itemsToRender: Array2D<Object>,
                    updateFunctions: Object }

robot = { robotPosition: Object, robotRotationDegree: Number,
          robotPath: Array<Object>, robotGoingCorrect: Boolean,
          sensors: Object }

updateFunctions = { setInitialData: Function, updateItemsToRender: Function,
                    setrobotRotationDegree: Function, setRobotPosition: Function,
                    setRobotPath : Function, setRobotGoingCorrect: Function }
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

            case "RetryButton":
                pauseSimulation();
                props.setSTTButtonState("Disabled");
                break;

            default :
                break;
        }
    };


    const simulateRobotMovement = function() {

        const rotateRobot = function() {
            props.simulationData.updateFunctions.setrobotRotationDegree(
                prevRotationDeg => ((prevRotationDeg + 90) % 360)
            );
        };

        const moveRobot = function(moveDistance) {

            props.simulationData.updateFunctions.updateItemsToRender("",
                props.simulationData.robot.robotPosition.x,
                props.simulationData.robot.robotPosition.y
            );

            const newRobotPosition = props.simulationData.robot.robotPosition;

            switch (props.simulationData.robot.robotRotationDegree) {
                case 0      : newRobotPosition.y += moveDistance; break;
                case 90     : newRobotPosition.x += moveDistance; break;
                case 180    : newRobotPosition.y -= moveDistance; break;
                case 270    : newRobotPosition.x -= moveDistance; break;
                default     :                                     break;
            }

            props.simulationData.updateFunctions.updateItemsToRender(
                "Robot", newRobotPosition.x, newRobotPosition.y
            );

            props.simulationData.updateFunctions.setRobotPosition(newRobotPosition);

        };

        const handleUnknownObjects = function(unknownObjects) {

            for (let iter=0; iter<unknownObjects.length; iter++) {

                const itemType = unknownObjects[iter].item === 'H' ? "Hazard"    :
                                 unknownObjects[iter].item === 'C' ? "Color"     :
                                 unknownObjects[iter].item === 'I' ? "Important" : null;

                props.simulationData.updateFunctions.updateItemsToRender(
                    itemType, unknownObjects[iter].x, unknownObjects[iter].y
                );
            }

            return;
        };

        const robotAction = APIRequestHandler.fetchRobotAction();

        props.simulationData.updateFunctions.setRobotGoingCorrect(
            robotAction.robotAction_isCorrectMove
        );

        switch (robotAction.robotAction_robotMovement) {
            case "Stop"     :                                                      break;
            case "Rotate"   : rotateRobot();                                       break;
            case "Move"     : moveRobot(robotAction.robotAction_moveDistance);     break;
            default         :                                                      break;
        }


        if (robotAction.unknownObjects) {

            const unknownObjects = Parser.parseUnknownObjects(robotAction.unknownObjects);
            handleUnknownObjects(unknownObjects);

        }

        if (robotAction.robotPath) {

            const parsedRobotPath = Parser.parseStringToPairsArray( robotAction.robotPath );
            props.simulationData.updateFunctions.setRobotPath( parsedRobotPath );

        }   else { setRenderButtonState( "RetryButton" ); }

    };


    const resumeSimulation = function() {
        const running = setInterval(() => { simulateRobotMovement(); }, 1000);
        setSimulationRunning(running);
    }

    const pauseSimulation = function() {
        clearInterval(simulationRunning);
        setSimulationRunning(null);
    }


    useEffect(  () => { if (simulationRunning) {
        return  () => { clearInterval(simulationRunning); };
        }}, [simulationRunning]);

    return (

        <div className="MainPanel">

            {(renderPanel === "UserInputPanel") &&
             <UserInputPanel userInputDataSetters={{setAreaSizeUserInput, setStartPositionUserInput,
                                                    setImportantPositionsUserInput, setHazardPositionsUserInput}}
            />}

            {(renderPanel === "SimulatePanel") &&
             <SimulatePanel areaSize={props.simulationData.areaSize}
                            itemsToRender={props.simulationData.itemsToRender}
                            robot={props.simulationData.robot}
                            updateFunctions={props.simulationData.updateFunctions}

            /> }


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

                {(renderButton === "PauseButton") &&
                    <PauseButton setRenderButtonState={setRenderButtonState} />}

                {(renderButton === "RetryButton") &&
                    <RetryButton setRenderPanelState={setRenderPanelState}
                                 setRenderButtonState={setRenderButtonState} />}

            </div>


        </div>

    );

};


export default MainPanel;