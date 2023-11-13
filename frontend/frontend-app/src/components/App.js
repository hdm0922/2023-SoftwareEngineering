import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';

const App = () => {

    const [inputText, setInputText] = useState('');

    const handleSpeechToText = (text) => {
        setInputText(text);
    };

    return (

        <div>
            <SpeechToTextButton onSpeechToText={handleSpeechToText} />
            <ResultTextBox text={inputText} />
        </div>

    );

};

export default App;