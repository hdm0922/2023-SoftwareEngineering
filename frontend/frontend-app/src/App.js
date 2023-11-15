import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';
import GenerateAreaButton from './GenerateAreaButton';
import StateMessageBox from './StateMessageBox';

const App = () => {

    const [inputText, setInputText] = useState('');
    const [speechButtonActivated, setSpeechButtonActivated] = useState(false);
    const [stateMessage, setStateMessage] = useState('비활성화')

    return (

        <div>
            <GenerateAreaButton speechButtonActivated={speechButtonActivated}
                                setSpeechButtonActivated={setSpeechButtonActivated}
                                setStateMessage={setStateMessage} />

            <StateMessageBox message={stateMessage}/>

            <ResultTextBox text={inputText} />
            <SpeechToTextButton setInputText={setInputText}
                                buttonActivated={speechButtonActivated}
                                setStateMessage={setStateMessage}/>
        </div>

    );

};

export default App;