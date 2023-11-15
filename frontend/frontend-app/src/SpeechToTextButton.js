import React from 'react';
import './SpeechToTextButton.css';
import { FaMicrophone } from "react-icons/fa6"


const SpeechToTextButton = ({ setInputText, setStateMessage,
                              buttonActivated }) => {

  const handleButtonClick = async () => {

    setStateMessage("음성 인식 중 ...");

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko-KR';

    const convertedText = await SpeechToTextButton.GetText(recognition);

    setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.");
    setInputText(convertedText);

  };

  return (

    <button className='SpeechToTextButton'
            onClick={handleButtonClick}
            disabled={!buttonActivated}>
      <FaMicrophone size={35} color='white' />
    </button>
    
  );
};


SpeechToTextButton.Activate = function(buttonActivated, setButtonActivated, setStateMessage) {
  if (buttonActivated) return;

  setButtonActivated(true);
  setStateMessage("마이크를 눌러 음성으로 명령을 입력하세요.")
  return;
};


SpeechToTextButton.Deactivate = function(buttonActivated, setButtonActivated, setStateMessage) {
  if (!buttonActivated) return;

  setButtonActivated(false);
  setStateMessage("비활성화")
  return;
};


SpeechToTextButton.GetText = function(recognition) {
  return new Promise((resolve, reject) => {

    recognition.onresult     = (event) => { resolve(event.results[0][0].transcript); };
    recognition.onerror      = (event) => { reject(event.error); };

    recognition.start();

  });
};


export default SpeechToTextButton;
