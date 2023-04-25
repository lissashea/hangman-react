import React from "react";

const Hangman = ({ guesses, word }) => {  
  const parts = [
    <circle key="0" cx="50" cy="20" r="10" />, // head
    <line key="1" x1="50" y1="30" x2="50" y2="60" />, // body
    <line key="2" x1="50" y1="40" x2="30" y2="20" />, // left arm
    <line key="3" x1="50" y1="40" x2="70" y2="20" />, // right arm
    <line key="4" x1="50" y1="60" x2="30" y2="80" />, // left leg
    <line key="5" x1="50" y1="60" x2="70" y2="80" />, // right leg
  ];

  const incorrectGuesses = guesses.filter(letter => !word.includes(letter)).length;
  const remainingGuesses = 6 - incorrectGuesses;

  const displayParts = remainingGuesses > 0 ? parts.slice(0, 6 - remainingGuesses) : parts;

  return (
    <svg height="100" width="100" viewBox="0 0 100 100">
      {displayParts}
    </svg>
  );
};

export default Hangman;
