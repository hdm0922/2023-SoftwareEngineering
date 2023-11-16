import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"

// props = { setSTTResult, setSTTButtonState, buttonDisabled };
const STTButton = function(props) {

  const OnEventButtonClicked = async function() {
    props.setSTTButtonState("RecognizingSpeech");

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang  = 'ko-KR';

    const convertedText = await GetText(recognition);
    props.setSTTResult(convertedText);

    // 서버로 convertedText 전송하기
    console.log(convertedText);

    props.setSTTButtonState("Running");
  }


  const GetText = function(recognition) {
    return new Promise((resolve, reject) => {

      recognition.onresult     = (event) => { resolve(event.results[0][0].transcript); };
      recognition.onerror      = (event) => { reject(event.error); };
  
      recognition.start();
  
    });
  }


  return (
    <button className='STTButton' onClick={OnEventButtonClicked} disabled={props.buttonDisabled}>
      <FaMicrophone className='STTButtonIcon' />
    </button>
  );




};

// STTButton.Activate = function(setStateMessage) {
//   if (this.activated) return;

//   this.activated = true;
//   setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.")
//   return;
// };


// STTButton.Deactivate = function(setStateMessage) {
//   if (!this.activated) return;

//   this.activated = false;
//   setStateMessage("음성 입력이 비활성화 되었습니다.")
//   return;
// };


export default STTButton;
