import React, { useState, useRef } from 'react';
import './App.css';

import MainPanel from './mainpanel/MainPanel';
import BottomPanel from './bottompanel/BottomPanel';
import Helper from './Helper';

import { BiSolidJoystickButton } from "react-icons/bi";
import { TbCircleLetterA } from "react-icons/tb";
import { TbCircleLetterB } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";


const App = function() {

    const [stateMessage, setStateMessage] = useState("음성 입력이 비활성화 되었습니다.");
    const [enableSTTButton, setEnableSTTButton] = useState(false);

    const [itemsToRender, setItemsToRender] = useState(Helper.Array2D(0, 0, {item:null, visible: false}));


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

    const updateItemsToRender = function(itemType, x, y, visibleToRobot) {
        const newItemsToRender = [...itemsToRender];
        newItemsToRender[y][x] = {item: itemType, visible: visibleToRobot};
        setItemsToRender(newItemsToRender);
    }



    return (

        <div className='gameBoyPanel'>

            <MainPanel setSTTButtonState = {setSTTButtonState}
                       itemsToRender = {itemsToRender}
                       setItemsToRender = {setItemsToRender}
                       updateItemsToRender = {updateItemsToRender}/>



            <BottomPanel setSTTButtonState              =   {setSTTButtonState}
                         stateMessage                   =   {stateMessage}
                         buttonDisabled                 =   {!enableSTTButton}
                         updateItemsToRender            =   {updateItemsToRender}
            />

            <div className='logo'>Team OHDONGDONG</div>

            <BiSolidJoystickButton className='crossPad'/>
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

        </div>

    );
};

export default App;