import React from 'react';
import { FaMicrophone } from "react-icons/fa6"


const convertSpeechToText = async (recognition) => {

  return new Promise((resolve, reject) => {

    recognition.onresult     = (event) => { resolve(event.results[0][0].transcript); };
    recognition.onerror      = (event) => { reject(event.error); };

    recognition.start();

  });

};


const SpeechToTextButton = ({ setInputText }) => {

  const handleButtonClick = async () => {

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko-KR';

    const convertedText = await convertSpeechToText(recognition);
    setInputText(convertedText);

  };

  return (
    <button onClick={ handleButtonClick }>
      <FaMicrophone></FaMicrophone>
    </button>
  );
};

export default SpeechToTextButton;
