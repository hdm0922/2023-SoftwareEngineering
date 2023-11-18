import React, { useState } from 'react';
import './BottomPanel.css'
import ResultTextBox from './ResultTextBox';
import StateMessageBox from './StateMessageBox';
import STTButton from './STTButton';

/*
props = { stateMessage: String, setSTTButtonState: Function,
          buttonDisabled: Boolean, updateSystemData: Function };
*/
const BottomPanel = function(props) {

    const [STTResult, setSTTResult] = useState("");

    return (
        <div className='BottomPanel'>
            <ResultTextBox text={STTResult}/>

            <StateMessageBox stateMessage={props.stateMessage}/>

            <STTButton setSTTResult         = {setSTTResult}
                       setSTTButtonState    = {props.setSTTButtonState}
                       buttonDisabled       = {props.buttonDisabled}
                       updateSystemData     = {props.updateSystemData}/>
        </div>
    );

};

export default BottomPanel;