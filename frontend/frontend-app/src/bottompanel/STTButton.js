import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"
import STTHandler from '../STTHandler';

// props = { setSTTResult, setSTTButtonState, buttonDisabled };
const STTButton = function(props) {

  const OnEventButtonClicked = async function() {
    props.setSTTButtonState("RecognizingSpeech");

    const SpeechHandler = new STTHandler('ko-KR');

    const convertedText = await SpeechHandler.GetConvertedText();
    props.setSTTResult(convertedText);

    // 서버로 convertedText 전송하기
    console.log(convertedText);

    props.setSTTButtonState("Running");
  }

  return (
    <button className='STTButton' onClick={OnEventButtonClicked} disabled={props.buttonDisabled}>
      <FaMicrophone className='STTButtonIcon' />
    </button>
  );

};


export default STTButton;
