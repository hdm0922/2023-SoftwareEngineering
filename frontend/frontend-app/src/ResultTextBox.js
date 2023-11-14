import React from 'react';
import './ResultTextBox.css';

const ResultTextBox = ({ text }) => {
  return <textarea value={text} readOnly/>;
};

export default ResultTextBox;