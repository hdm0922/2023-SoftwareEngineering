import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"
import STTHandler from '../STTHandler';
import APIRequestHandler from '../APIRequestHandler';
import Parser from '../Parser';

/*
props = { setSTTResult: Function, setSTTButtonState: Function,
          buttonDisabled: Boolean, updateSystemData: Function };
*/
const STTButton = function(props) {

  const OnEventButtonClicked = async function() {
    props.setSTTButtonState("RecognizingSpeech");

    const SpeechHandler = new STTHandler('ko-KR');

    const convertedText = await SpeechHandler.GetConvertedText();
    props.setSTTResult(convertedText);

    const userOrder = Parser.parseUserSTT(convertedText);

    const newSystemData = APIRequestHandler.fetchUpdateData(userOrder);
    if ( newSystemData ) { props.updateSystemData(newSystemData); }

    props.setSTTButtonState("Running");
  }

  return (
    <button className='STTButton' onClick={OnEventButtonClicked} disabled={props.buttonDisabled}>
      <FaMicrophone className='STTButtonIcon' />
    </button>
  );

};


export default STTButton;
