import React from 'react';
import './ResultTextBox.css';

// props = { text };
const ResultTextBox = function(props) {
  return <textarea className='ResultTextBox' value={props.text} readOnly />;
};

export default ResultTextBox;