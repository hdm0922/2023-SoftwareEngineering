import React, { useState } from 'react';
import './App.css';

import MainPanel from './mainpanel/MainPanel';
import BottomPanel from './bottompanel/BottomPanel';

import { BiSolidJoystickButton } from "react-icons/bi";
import { TbCircleLetterA } from "react-icons/tb";
import { TbCircleLetterB } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";




// const App = function() {

//     const [rotationDegree, setRotationDegree] = useState(0);
//     const rotationDegreeReference = useRef(rotationDegree);

//     // rotationDegree 를 90 증가시킵니다.
//     const rotate = function() {
//         setRotationDegree(prev => (prev + 90) % 360);
//         console.log( "Rotate Should Be = ", rotationDegree );
//     };


//     let iter = 0;
//     const simulate = function() {


//         switch(iter % 2) {
//             case 0: rotate(); break;
//             case 1: console.log("Moving in direction : ", rotationDegreeReference.current); break;
//             default: break;
//         }
//         iter++;
//         return;
//     };

//     // // Resume버튼을 누르면 1초마다 simulate를 호출합니다.
//     const play = function() {
//         // setInterval(() => { simulate(); }, 1000);
//     }


//     useEffect(() => {
//         rotationDegreeReference.current = rotationDegree;
//     }, [rotationDegree]);

//     useEffect(() => {
//         const intervalId = setInterval(simulate, 1000);

//         return () => {
//         clearInterval(intervalId);
//         };
//     }, []); // [] ensures this effect runs only once


//     return (
//         <div >
//             <button onClick={play}> {rotationDegree} </button>
//         </div>
//     );
// }



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