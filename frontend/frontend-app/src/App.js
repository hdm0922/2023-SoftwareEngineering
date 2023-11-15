import React, { useState } from 'react';
import MainPanel from './MainPanel';
import STTButton from './STTButton';
import ResultTextBox from './ResultTextBox';
import GenerateAreaButton from './GenerateAreaButton';
import StateMessageBox from './StateMessageBox';



const App = () => {

    const [inputText, setInputText] = useState('');
    const [stateMessage, setStateMessage] = useState('음성 입력이 비활성화 돼있습니다.')


    return (

        <div>
            <GenerateAreaButton speechButton={STTButton}
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