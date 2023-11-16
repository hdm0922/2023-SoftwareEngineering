import React, { useState } from 'react';
import MainPanel from './MainPanelComponents/MainPanel';
import BottomPanel from './BottomPanel';


const App = () => {

    const [stateMessage, setStateMessage] = useState("음성 입력이 비활성화 되었습니다.");
    const [enableSTTButton, setEnableSTTButton] = useState(true);

    const setState = function(newState) {

        switch (newState) {

            case "Disabled":
                setStateMessage("음성 입력이 비활성화 되었습니다.");
                break;

            case "Running":
                setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.");
                break;

            case "RecognizingSpeech":
                setStateMessage("음성 인식 중 ...");
                break;
        }

    };


    return (

        <div>

            <MainPanel />
            <BottomPanel setState={setState} stateMessage={stateMessage}
                         buttonDisabled={!enableSTTButton}/>

        </div>

    );

};

export default App;