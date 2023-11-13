import React from 'react';
import { FaMicrophone } from "react-icons/fa6"


const SpeechToTextButton = ({ onSpeechToText }) => {
  const convertSpeechToText = async () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ko-KR';

      return new Promise((resolve, reject) => {
        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          resolve(text);
        };

        recognition.onerror = (event) => {
          reject(event.error);
        };

        recognition.start();
      });
    } catch (error) {
      console.error('Speech recognition error:', error);
      throw error;
    }
  };

  const handleButtonClick = async () => {
    try {
      const textFromSpeech = await convertSpeechToText();
      onSpeechToText(textFromSpeech);
    } catch (error) {
      console.error('Error during speech-to-text:', error);
    }
  };

  return (
    <button onClick={handleButtonClick}>
      <FaMicrophone></FaMicrophone>
    </button>
  );
};

export default SpeechToTextButton;
