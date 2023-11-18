import React, { useState } from 'react';
import MainPanel from './mainpanel/MainPanel';
import BottomPanel from './bottompanel/BottomPanel';


const App = () => {

    const [stateMessage, setStateMessage] = useState("음성 입력이 비활성화 되었습니다.");
    const [enableSTTButton, setEnableSTTButton] = useState(false);

    // const itemsToRender = Array.prototype({length:})

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

    const updateSystemData = function(newSystemData) {

        if (newSystemData.items) {

        }

    };


    return (

        <div>

            <MainPanel setSTTButtonState    = {setSTTButtonState} />

            <BottomPanel setSTTButtonState  = {setSTTButtonState}
                         stateMessage       = {stateMessage}
                         buttonDisabled     = {!enableSTTButton}
                         updateSystemData   = {updateSystemData}/>

        </div>

    );

};

export default App;