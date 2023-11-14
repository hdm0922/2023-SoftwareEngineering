import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';
import GenerateAreaButton from './GenerateAreaButton';

const App = () => {

    const [inputText, setInputText] = useState('');

    return (

        <div>
            <GenerateAreaButton></GenerateAreaButton>
            <ResultTextBox text={inputText} />
            <SpeechToTextButton setInputText={setInputText} />
        </div>

    );

};

export default App;