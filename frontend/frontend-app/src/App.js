import React, { useState } from 'react';
import MainPanel from './MainPanelComponents/MainPanel';
import STTButton from './SpeechHandleComponents/STTButton';
import ResultTextBox from './SpeechHandleComponents/ResultTextBox';
import ToggleSTTButton from './ToggleSTTButton';
import StateMessageBox from './SpeechHandleComponents/StateMessageBox';



const App = () => {

    const [inputText, setInputText] = useState('');
    const [stateMessage, setStateMessage] = useState('음성 입력이 비활성화 돼있습니다.');


    return (

        <div>
            <ToggleSTTButton speechButton={STTButton}
                             setStateMessage={setStateMessage} />


            <MainPanel.ReactElement />


            <StateMessageBox message={stateMessage}/>

            <ResultTextBox text={inputText} />
            <STTButton.ReactElement setInputText={setInputText}
                                    setStateMessage={setStateMessage}/>
        </div>

    );

};

export default App;