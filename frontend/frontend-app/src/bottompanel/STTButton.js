import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"
import STTHandler from '../STTHandler';
import APIRequestHandler from '../APIRequestHandler';
import Parser from '../Parser';

/*
props = { setSTTResult: Function, setSTTButtonState: Function,
          buttonDisabled: Boolean, updateSimulationDataViaSTT: Function };
*/
const STTButton = function(props) {

  const OnEventButtonClicked = async function() {
    props.setSTTButtonState("RecognizingSpeech");

    const SpeechHandler = new STTHandler('ko-KR');

    const convertedText = await SpeechHandler.GetConvertedText();
    props.setSTTResult(convertedText);

    const userOrder  = Parser.parseUserSTT(convertedText);
    const fetchedUpdateData = APIRequestHandler.fetchUpdateDataViaSTT(userOrder);
    const updateData = {

      item: (
        fetchedUpdateData.itemID ?
        {
          itemType  : fetchedUpdateData.itemID,
          x         : userOrder.x,
          y         : userOrder.y
        }           : null
      ),

      robotPath: fetchedUpdateData.robotPath

    };

    props.updateSimulationDataViaSTT(updateData);
    props.setSTTButtonState("Running");
  }

  return (
    <button className='STTButton' onClick={OnEventButtonClicked} disabled={props.buttonDisabled}>
      <FaMicrophone className='STTButtonIcon' />
    </button>
  );

};


export default STTButton;
