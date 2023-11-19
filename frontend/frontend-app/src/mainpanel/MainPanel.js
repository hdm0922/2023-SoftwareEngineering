import React, { useState } from "react";
import './MainPanel.css'

import UserInputPanel from "./renderpanel/UserInputPanel";
import SimulatePanel from "./renderpanel/SimulatePanel";

import ResumeButton from "./renderbutton/ResumeButton";
import PauseButton from "./renderbutton/PauseButton";
import GenerateAreaButton from "./renderbutton/GenerateAreaButton";

import Parser from "../Parser";
import APIRequestHandler from "../APIRequestHandler";


const Array2D = function(x, y, value) {
    const arr = [];

    for (let iter=0; iter<y; iter++) {
        arr.push( [] );
        for (let jter=0; jter<x; jter++) { arr[iter].push(value); }
    }

    return arr;
}

// props = { setSTTButtonState: Function, areaSize: Object }
const MainPanel = function(props) {

    const [renderPanel, setRenderPanel] = useState("UserInputPanel");
    const [renderButton, setRenderButton] = useState("GenerateAreaButton");
    // const [simulationRunning, setSimulationRunning] = useState(false);



    const [areaSizeUserInput, setAreaSizeUserInput] = useState("");
    const [startPositionUserInput, setStartPositionUserInput] = useState("");
    const [importantPositionsUserInput, setImportantPositionsUserInput] = useState("");
    const [hazardPositionsUserInput, setHazardPositionsUserInput] = useState("");



    const [areaSizeX, setAreaSizeX] = useState(0);
    const [areaSizeY, setAreaSizeY] = useState(0);
    const [robotPath, setRobotPath] = useState([]);
    const [itemsToRender, setItemsToRender] = useState(Array2D(areaSizeX, areaSizeY, null));
    const [robotPosition, setRobotPosition] = useState({});
    const [robotRotationDegree, setrobotRotationDegree] = useState(0);

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

    const setInitialData = function(initialData) {

        const inputAreaSize             = Parser.stringToPairsArray(initialData.areaSize);
        const initRobotPosition         = Parser.stringToPairsArray(initialData.robotPosition);
        const initRobotPath             = Parser.stringToPairsArray(initialData.robotPath);
        const initHazardPositions       = Parser.stringToPairsArray(initialData.hazardPositions);
        const initImportantPositions    = Parser.stringToPairsArray(initialData.importantPositions);

        setAreaSizeX( inputAreaSize[0].x+1 );
        setAreaSizeY( inputAreaSize[0].y+1 );
        setRobotPosition( initRobotPosition[0] );
        setRobotPath( initRobotPath );

        const initItemsToRender = Array2D(inputAreaSize[0].x+1, inputAreaSize[0].y+1, '');

        const initializeRenderItems = (dataArray, renderType) => {
            for (let iter=0; iter<dataArray.length; iter++) {
                initItemsToRender[dataArray[iter].y]
                                 [dataArray[iter].x] = renderType;
            }
        }

        initializeRenderItems(initHazardPositions, "Hazard");
        initializeRenderItems(initImportantPositions, "Important");
        initializeRenderItems(initRobotPosition, "Robot");

        setItemsToRender( initItemsToRender );
    };

    const updateItemsToRender = function(itemType, x, y) {
        const newItemsToRender = [...itemsToRender];
        newItemsToRender[y][x] = itemType;
        setItemsToRender(newItemsToRender);
    }

    const MoveRobot = function() {

        const nextMovement = APIRequestHandler.fetchRobotMovement();
        
        switch (nextMovement.robotMovement) {

            case "Stop":
                break;

            case "Rotate" :
                setrobotRotationDegree( (robotRotationDegree + 90) % 360 );
                break;

            case "Move" :
                
                updateItemsToRender("", robotPosition.x, robotPosition.y);
                const newRobotPosition = {x: robotPosition.x, y: robotPosition.y};

                switch (robotRotationDegree) {
                    case 0      : newRobotPosition.y++; break;
                    case 90     : newRobotPosition.x++; break;
                    case 180    : newRobotPosition.y--; break;
                    case 270    : newRobotPosition.x--; break;
                    default     :                       break;
                }

                updateItemsToRender("Robot", newRobotPosition.x, newRobotPosition.y);
                setRobotPosition(newRobotPosition);
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
             <SimulatePanel areaSize={{x: areaSizeX, y: areaSizeY}}
                            robotPath={robotPath}
                            robotRotationDegree={robotRotationDegree}
                            itemsToRender={itemsToRender}/> }

            <button onClick={MoveRobot} style={{position:"absolute"}}/>

            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        setInitialData={setInitialData}
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