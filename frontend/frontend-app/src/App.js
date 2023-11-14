import React, { useState } from 'react';
import SpeechToTextButton from './SpeechToTextButton';
import ResultTextBox from './ResultTextBox';

const App = () => {

    const [inputText, setInputText] = useState('');

    return (

        <div>
            <ResultTextBox text={inputText} />
            <SpeechToTextButton setInputText={setInputText} />
        </div>

    );

};

export default App;