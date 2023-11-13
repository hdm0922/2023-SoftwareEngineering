import React from 'react';

const ResultTextBox = ({ text }) => {
  return (
    <textarea value={text} readOnly />
  );
};

export default ResultTextBox;