import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';

const App = () => {

    const [inputText, setInputText] = useState('');

    return (

        <div>
            <SpeechToTextButton setInputText={setInputText} />
            <ResultTextBox text={inputText} />
        </div>

    );

};

export default App;