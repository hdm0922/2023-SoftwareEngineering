import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"
import STTHandler from '../STTHandler';
import APIRequestHandler from '../APIRequestHandler';
import Parser from '../Parser';

// props = { setSTTResult: Function, setSTTButtonState: Function, buttonDisabled: Boolean };
const STTButton = function(props) {

  const OnEventButtonClicked = async function() {
    props.setSTTButtonState("RecognizingSpeech");

    const SpeechHandler = new STTHandler('ko-KR');

    const convertedText = await SpeechHandler.GetConvertedText();
    props.setSTTResult(convertedText);

    // 서버로 parsedData 전송한 후 업데이트된 데이터 수신
    const parsedData = Parser.parseUserSTT(convertedText);
    const operationAreaData = APIRequestHandler.notifyUserSTT(parsedData);

    

    props.setSTTButtonState("Running");
  }

  return (
    <button className='STTButton' onClick={OnEventButtonClicked} disabled={props.buttonDisabled}>
      <FaMicrophone className='STTButtonIcon' />
    </button>
  );

};


export default STTButton;
