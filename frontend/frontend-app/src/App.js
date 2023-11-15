import React, { useState } from 'react';
import STTButton from './STTButton';
import ResultTextBox from './ResultTextBox';
import GenerateAreaButton from './GenerateAreaButton';
import StateMessageBox from './StateMessageBox';



const App = () => {

    const [inputText, setInputText] = useState('');
    const [stateMessage, setStateMessage] = useState('비활성화')


    return (

        <div>
            <GenerateAreaButton speechButton={STTButton}
                                setStateMessage={setStateMessage} />

            <StateMessageBox message={stateMessage}/>

            <ResultTextBox text={inputText} />
            <STTButton.ReactElement setInputText={setInputText}
                                    setStateMessage={setStateMessage}/>
        </div>

    );

};

export default App;