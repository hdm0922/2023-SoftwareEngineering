import React, { useEffect, useRef, useState } from "react";
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
                    setRobotRotationDegree: Function, setRobotPosition: Function,
                    setRobotPath : Function, setRobotGoingCorrect: Function }
*/
const MainPanel = function(props) {

    const [renderPanel, setRenderPanel] = useState("UserInputPanel");
    const [renderButton, setRenderButton] = useState("GenerateAreaButton");



    const [simulationRunning, setSimulationRunning] = useState(null);



    const [areaSizeUserInput, setAreaSizeUserInput] = useState("");
    const [robotPositionUserInput, setRobotPositionUserInput] = useState("");
    const [importantPositionsUserInput, setImportantPositionsUserInput] = useState("");
    const [colorBlobPositionsUserInput, setColorBlobPositionsUserInput] = useState("");
    const [hazardPositionsUserInput, setHazardPositionsUserInput] = useState("");


    const [areaSize,            setAreaSize]                    = useState({});
    const [robotPath,           setRobotPath]                   = useState([]);
    const [robotPosition,       setRobotPosition]               = useState({});
    const [robotRotationDegree, setRobotRotationDegree]         = useState(0);
    const [robotGoingCorrect,   setRobotGoingCorrect]           = useState(true);

    const [hazardSensorNorth,       setHazardSensorNorth]       = useState(false);
    const [colorBlobSensorNorth,    setColorBlobSensorNorth]    = useState(false);
    const [colorBlobSensorEast,     setColorBlobSensorEast]     = useState(false);
    const [colorBlobSensorWest,     setColorBlobSensorWest]     = useState(false);

    const robotRotationDegreeReference = useRef(robotRotationDegree);



    useEffect(() => {
        robotRotationDegreeReference.current = robotRotationDegree; },
        [robotRotationDegree]);



    const setInitialData = function(initialData) {

        const initializedAreaSize  = { x: (initialData.areaSize.x + 1),
                                       y: (initialData.areaSize.y + 1) };
        const initItemsToRender    = Helper.Array2D(initializedAreaSize.x, initializedAreaSize.y, {item: null, visible:false});

        const initializeRenderItems = (dataArray, renderType) => {
            for (let iter=0; iter<dataArray.length; iter++) {
                initItemsToRender[dataArray[iter].y]
                                 [dataArray[iter].x] = {item: renderType, visible: true};
            }
        }

        initializeRenderItems(initialData.importantPositions, "Important");
        initializeRenderItems(initialData.colorBlobPositions, "ColorBlob");
        initializeRenderItems(initialData.hazardPositions, "Hazard");
        initializeRenderItems([initialData.robotPosition], "Robot");


        setAreaSize( initializedAreaSize );
        setRobotPosition( initialData.robotPosition );
        setRobotPath( initialData.robotPath );
        props.setItemsToRender( initItemsToRender );
    };

    


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
            setRobotRotationDegree( prevRotationDeg => ((prevRotationDeg + 90) % 360) )
        };


        const moveRobot = function(moveDistance) {

            const latestRobotRotationDegree = robotRotationDegreeReference.current;

            props.updateItemsToRender("", robotPosition.x, robotPosition.y, true);

            const newRobotPosition = robotPosition;

            switch (latestRobotRotationDegree) {
                case 0      : newRobotPosition.y += moveDistance; break;
                case 90     : newRobotPosition.x += moveDistance; break;
                case 180    : newRobotPosition.y -= moveDistance; break;
                case 270    : newRobotPosition.x -= moveDistance; break;
                default     :                                     break;
            }

            props.updateItemsToRender( "Robot", newRobotPosition.x, newRobotPosition.y, true );

            setRobotPosition(newRobotPosition);
        };


        const handleUnknownObjects = function(unknownObjects) {

            for (let iter=0; iter<unknownObjects.length; iter++) {

                const itemType = unknownObjects[iter].item === 'H' ? "Hazard"    :
                                 unknownObjects[iter].item === 'C' ? "ColorBlob" :
                                 unknownObjects[iter].item === 'I' ? "Important" : null;

                props.updateItemsToRender(itemType, unknownObjects[iter].x, unknownObjects[iter].y, true);
            }

            return;
        };


        const handleRobotAction = async function(robotAction) {

            setRobotGoingCorrect( robotAction.robotAction_isCorrectMove );

            switch (robotAction.robotAction_robotMovement) {

                case "Rotate"   :
                    rotateRobot();
                    break;

                case "Move"     :
                    moveRobot(robotAction.robotAction_moveDistance);
                    break;    

                default  :
                    break;
            }

    
            if (robotAction.unknownObjects) {
                const unknownObjects = Parser.parseUnknownObjects(robotAction.unknownObjects);
                handleUnknownObjects(unknownObjects);
            }
    
            if (robotAction.robotPath) {
    
                const parsedRobotPath = Parser.parseStringToPairsArray( robotAction.robotPath );
                setRobotPath( parsedRobotPath );
    
            }   else { setRenderButtonState( "RetryButton" ); }    

        };

        const fetchedRobotAction = APIRequestHandler.fetchRobotAction();
        fetchedRobotAction.then(robotAction => {
            handleRobotAction(robotAction);
        });

        return;
    };


    const resumeSimulation = function() {
        const running = setInterval(async () => { simulateRobotMovement(); }, 1000);
        setSimulationRunning(running);
    };

    const pauseSimulation = function() {
        clearInterval(simulationRunning);
        setSimulationRunning(null);
    };

    const resetSystemState = function() {

        setAreaSizeUserInput("");
        setRobotPositionUserInput("");
        setImportantPositionsUserInput("");
        setColorBlobPositionsUserInput("");
        setHazardPositionsUserInput("");

        setRobotRotationDegree(0);
        setRobotGoingCorrect(true);

        return;
    };

    useEffect(  () => { if (simulationRunning) {
        return  () => { clearInterval(simulationRunning); };
        }}, [simulationRunning]);

    return (

        <div className="MainPanel">

            {(renderPanel === "UserInputPanel") &&
             <UserInputPanel userInputDataSetters={{setAreaSizeUserInput,
                                                    setRobotPositionUserInput,
                                                    setImportantPositionsUserInput,
                                                    setColorBlobPositionsUserInput,
                                                    setHazardPositionsUserInput}}
            />}

            {(renderPanel === "SimulatePanel") &&
             <SimulatePanel areaSize={areaSize}
                            itemsToRender={props.itemsToRender}
                            robot={{
                                robotPosition: robotPosition,
                                robotRotationDegree: robotRotationDegree,
                                robotPath: robotPath,
                                robotGoingCorrect: robotGoingCorrect,

                                sensors: {
                                    hazardSensorNorth: hazardSensorNorth,
                                    colorBlobSensorNorth: colorBlobSensorNorth,
                                    colorBlobSensorEast: colorBlobSensorEast,
                                    colorBlobSensorWest: colorBlobSensorWest
                                }
                            }}
                            updateFunctions={{
                                setHazardSensorNorth: setHazardSensorNorth,
                                setColorBlobSensorNorth: setColorBlobSensorNorth,
                                setColorBlobSensorEast: setColorBlobSensorEast,
                                setColorBlobSensorWest: setColorBlobSensorWest
                            }}

            /> }


            <div className="Bottom">

                {(renderButton === "GenerateAreaButton") &&
                    <GenerateAreaButton setRenderPanelState={setRenderPanelState}
                                        setRenderButtonState={setRenderButtonState}
                                        setInitialData={setInitialData}
                                        userInputData = {{areaSizeUserInput,
                                                          robotPositionUserInput,
                                                          importantPositionsUserInput,
                                                          colorBlobPositionsUserInput,
                                                          hazardPositionsUserInput}}
                    />}


                {(renderButton === "ResumeButton") &&
                    <ResumeButton setRenderButtonState={setRenderButtonState} />}

                {(renderButton === "PauseButton") &&
                    <PauseButton setRenderButtonState={setRenderButtonState} />}

                {(renderButton === "RetryButton") &&
                    <RetryButton setRenderPanelState={setRenderPanelState}
                                 setRenderButtonState={setRenderButtonState}
                                 resetSystemState={resetSystemState}/>}

            </div>


        </div>

    );

};


export default MainPanel;


