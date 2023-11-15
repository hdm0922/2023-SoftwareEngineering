import React from 'react';
import './STTButton.css';
import { FaMicrophone } from "react-icons/fa6"


const STTButton = {
  activated: false,
};

STTButton.ReactElement = ({ setInputText, setStateMessage }) => {

  const handleButtonClick = async () => {

    setStateMessage("음성 인식 중 ...");

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko-KR';

    const convertedText = await STTButton.GetText(recognition);

    setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.");
    setInputText(convertedText);

  };

  return (

    <button className='STTButton'
            onClick={handleButtonClick}
            disabled={!STTButton.activated}>
      <FaMicrophone className='STTButton_icon' />
    </button>

  );
};



STTButton.Activate = function(setStateMessage) {
  if (this.activated) return;

  this.activated = true;
  setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.")
  return;
};


STTButton.Deactivate = function(setStateMessage) {
  if (!this.activated) return;

  this.activated = false;
  setStateMessage("음성 입력이 비활성화 되었습니다.")
  return;
};


STTButton.GetText = function(recognition) {
  return new Promise((resolve, reject) => {

    recognition.onresult     = (event) => { resolve(event.results[0][0].transcript); };
    recognition.onerror      = (event) => { reject(event.error); };

    recognition.start();

  });
};


export default STTButton;
