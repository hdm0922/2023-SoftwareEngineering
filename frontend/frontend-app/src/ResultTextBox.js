import React from 'react';
import './ResultTextBox.css';

const ResultTextBox = ({ text }) => {
  return <textarea className='ResultTextBox'
                   value={text}
                   readOnly />;
};

export default ResultTextBox;