import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';
import GenerateAreaButton from './GenerateAreaButton';
import StateMessageBox from './StateMessageBox';

const App = () => {

    const [inputText, setInputText] = useState('');
    const [speechButtonActivated, setSpeechButtonActivated] = useState(false);

    const stateMessages = ["비활성화", "마이크 인식 중 ..."];

    return (

        <div>
            <GenerateAreaButton toggleFunction={setSpeechButtonActivated}/>
            <StateMessageBox message={stateMessages[0]}/>

            <ResultTextBox text={inputText} />
            <SpeechToTextButton setInputText={setInputText}
                                buttonActivated={speechButtonActivated}/>
        </div>

    );

};

export default App;