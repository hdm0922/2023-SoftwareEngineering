import React, { useState } from "react";
import './MainPanel.css'

import UserInputPanel from "./renderpanel/UserInputPanel";
import SimulatePanel from "./renderpanel/SimulatePanel";

import ResumeButton from "./renderbutton/ResumeButton";
import PauseButton from "./renderbutton/PauseButton";
import GenerateAreaButton from "./renderbutton/GenerateAreaButton";
import Parser from "../Parser";


const Array2D = function(x, y, value) {
    const arr = [];

    for (let iter=0; iter<y; iter++) {
        const row = [];
    for (let iter=0; iter<x; iter++) { row.push(value); }
        arr.push(row);
    }

    return arr;
}

// props = { setSTTButtonState: Function, areaSize: Object }
const MainPanel = function(props) {

    const [renderPanel, setRenderPanel] = useState("UserInputPanel");
    const [renderButton, setRenderButton] = useState("GenerateAreaButton");


    const [areaSize, setAreaSize] = useState("");
    const [startPosition, setStartPosition] = useState("");
    const [importantPositions, setImportantPositions] = useState("");
    const [hazardPositions, setHazardPositions] = useState("");

    const [areaSizeX, setAreaSizeX] = useState(0);
    const [areaSizeY, setAreaSizeY] = useState(0);
    const [robotPath, setRobotPath] = useState([]);
    const [itemsToRender, setItemsToRender] = useState(Array2D(areaSizeX, areaSizeY, null));

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

        setAreaSizeX( inputAreaSize[0].x + 1 );
        setAreaSizeY( inputAreaSize[0].y + 1 );
        setRobotPath( initRobotPath );

        const initItemsToRender = Array2D(inputAreaSize[0].x + 1, inputAreaSize[0].y + 1, '');

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


    return (

        <div className="MainPanel">

            {(renderPanel === "UserInputPanel") &&
             <UserInputPanel userInputDataSetters={{setAreaSize, setStartPosition,
                                                    setImportantPositions, setHazardPositions}}/>}

            {(renderPanel === "SimulatePanel") &&
             <SimulatePanel areaSize={{x: areaSizeX, y: areaSizeY}}/>}


            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        setInitialData={setInitialData}
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