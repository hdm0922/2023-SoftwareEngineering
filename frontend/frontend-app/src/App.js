import React, { useState } from 'react';
import './App.css';

import MainPanel from './mainpanel/MainPanel';
import BottomPanel from './bottompanel/BottomPanel';

import { BiSolidJoystickButton } from "react-icons/bi";
import { TbCircleLetterA } from "react-icons/tb";
import { TbCircleLetterB } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";



// import Parser from './Parser';
// const App = function() {

//     const click = function() {
//         const Message = "위험지역 둘 하나"
//         console.log( Parser.parseUserSTT(Message) );
//     };

//     return <button onClick={click}>CLICK</button>

// };

const App = () => {

    const [stateMessage, setStateMessage] = useState("음성 입력이 비활성화 되었습니다.");
    const [enableSTTButton, setEnableSTTButton] = useState(false);


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




    return (

        <div className='gameBoyPanel'>

            <MainPanel setSTTButtonState =   {setSTTButtonState}/>



            <BottomPanel setSTTButtonState              =   {setSTTButtonState}
                         stateMessage                   =   {stateMessage}
                         buttonDisabled                 =   {!enableSTTButton}
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