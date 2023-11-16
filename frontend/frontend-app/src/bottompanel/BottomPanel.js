import React, { useState } from 'react';
import './BottomPanel.css'
import ResultTextBox from './ResultTextBox';
import StateMessageBox from './StateMessageBox';
import STTButton from './STTButton';


// props = { stateMessage, setSTTButtonState, buttonDisabled };
const BottomPanel = function(props) {

    const [STTResult, setSTTResult] = useState("");

    return (
        <div className='BottomPanel'>
            <ResultTextBox text={STTResult}/>

            <StateMessageBox stateMessage={props.stateMessage}/>

            <STTButton setSTTResult={setSTTResult}
                       setSTTButtonState={props.setSTTButtonState}
                       buttonDisabled={props.buttonDisabled}/>
        </div>
    );

};

export default BottomPanel;