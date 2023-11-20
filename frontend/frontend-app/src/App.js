import React, { useState } from 'react';
import './App.css';

import MainPanel from './mainpanel/MainPanel';
import BottomPanel from './bottompanel/BottomPanel';
import Parser from './Parser';

import { ImCross } from "react-icons/im";
import { TbCircleLetterA } from "react-icons/tb";
import { TbCircleLetterB } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";

const Array2D = function(x, y, value) {
    const arr = [];

    for (let iter=0; iter<y; iter++) {
        arr.push( [] );
        for (let jter=0; jter<x; jter++) { arr[iter].push(value); }
    }

    return arr;
}

const App = () => {

    const [stateMessage, setStateMessage] = useState("음성 입력이 비활성화 되었습니다.");
    const [enableSTTButton, setEnableSTTButton] = useState(false);

    const [areaSize, setAreaSize] = useState({});
    const [robotPath, setRobotPath] = useState([]);
    const [robotPosition, setRobotPosition] = useState({});
    const [robotRotationDegree, setrobotRotationDegree] = useState(0);
    const [itemsToRender, setItemsToRender] = useState(Array2D(0, 0, null));
 
    const setSTTButtonState = function(newState) {
        
        switch (newState) {

            case "Disabled":
                setStateMessage("음성 입력이 비활성화 되었습니다.");
                setEnableSTTButton(false);
                break;

            case "Running":
                setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.");
                setEnableSTTButton(true);
                break;

            case "RecognizingSpeech":
                setStateMessage("음성 인식 중 ...");
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

        const initializedAreaSize = { x: (inputAreaSize[0].x + 1), y: (inputAreaSize[0].y + 1) };
        const initItemsToRender = Array2D(initializedAreaSize.x, initializedAreaSize.y, '');

        const initializeRenderItems = (dataArray, renderType) => {
            for (let iter=0; iter<dataArray.length; iter++) {
                initItemsToRender[dataArray[iter].y]
                                 [dataArray[iter].x] = renderType;
            }
        }

        initializeRenderItems(initHazardPositions, "Hazard");
        initializeRenderItems(initImportantPositions, "Important");
        initializeRenderItems(initRobotPosition, "Robot");


        setAreaSize( initializedAreaSize );
        setRobotPosition( initRobotPosition[0] );
        setRobotPath( initRobotPath );
        setItemsToRender( initItemsToRender );
    };

    const updateItemsToRender = function(itemType, x, y) {
        const newItemsToRender = [...itemsToRender];
        newItemsToRender[y][x] = itemType;
        setItemsToRender(newItemsToRender);
    }


    const updateSimulationDataViaSTT = function(updateData) {

        if (updateData.robotPath) {
            setRobotPath( Parser.stringToPairsArray(updateData.robotPath) );
        }

        if (updateData.item) {
            console.log( updateData.item );
            updateItemsToRender(updateData.item.itemType,
                                updateData.item.x, updateData.item.y);
        }

    }


    return (

        <div className='gameBoyPanel'>

            <MainPanel setSTTButtonState        =   {setSTTButtonState}
                       simulationData           =   {{

                            areaSize: areaSize,
                            itemsToRender: itemsToRender,

                            robot: {
                                robotPosition: robotPosition,
                                robotRotationDegree: robotRotationDegree,
                                robotPath: robotPath
                            },

                            updateFunctions: {
                                setInitialData: setInitialData,
                                updateItemsToRender: updateItemsToRender,
                                setrobotRotationDegree: setrobotRotationDegree,
                                setRobotPosition: setRobotPosition
                            }

                       }}
            />



            <BottomPanel setSTTButtonState              =   {setSTTButtonState}
                         stateMessage                   =   {stateMessage}
                         buttonDisabled                 =   {!enableSTTButton}
                         updateSimulationDataViaSTT     =   {updateSimulationDataViaSTT}
            />

            <div className='logo'>Team OHDONGDONG</div>

            <ImCross className='crossPad'/>
            <TbCircleLetterA className='buttonA'/>
            <TbCircleLetterB className='buttonB'/>

            <div className='selectButtonPanel' >
                <FaCircle className='buttonSelect'/>
                {' select'}
            </div>

            <div className='startButtonPanel' >
                <FaCircle className='buttonStart'/>
                {' start'}
            </div>

            {/* <div className='border'> <ImCross className='crossIcon'/> </div> */}
            

        </div>

    );
};

export default App;