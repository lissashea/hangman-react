import "./HangmanGame.css";
import Hangman from "./Hangman.jsx";
import React, { useState, useEffect, useCallback } from "react";

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);

  const fetchDefinition = async (word) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    if (data.length > 0 && data[0].meanings.length > 0) {
      setDefinition(data[0].meanings[0].definitions[0].definition);
    }
  };

  const fetchWord = useCallback(async () => {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await response.json();
    const word = data[0];
    setWord(word);
    fetchDefinition(word);
  }, [fetchDefinition]);

  useEffect(() => {
    fetchWord();
  }, []);

  const handleGuess = (letter) => {
    if (!guesses.includes(letter)) {
      setGuesses([...guesses, letter]);
      if (!word.includes(letter)) {
        setRemainingGuesses(remainingGuesses - 1);
      }
    }
  };

  const wordLetters = word.split("");

  const guessWord = wordLetters.map((letter) =>
    guesses.includes(letter) ? letter : "_"
  );

  const isGameOver = remainingGuesses === 0 || guessWord.join("") === word;

  return (
    <div className="HangmanGame">
      <h1>{guessWord.join(" ")}</h1>
      <div className="HangmanGame-guesses">
        {guesses.map((letter) => (
          <span key={letter}>{letter}</span>
        ))}
      </div>
      <div className="HangmanGame-remaining-guesses">
        Remaining Guesses: {remainingGuesses}
      </div>
      {isGameOver && (
        <div className="HangmanGame-game-over">
          {remainingGuesses === 0 ? "Game Over!" : "You Win!"}
        </div>
      )}
      <div className="HangmanGame-definition">{definition}</div>
      <div className="HangmanGame-buttons">
        {!isGameOver &&
          "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guesses.includes(letter)}
            >
              {letter}
            </button>
          ))}
        {isGameOver && <button onClick={() => fetchWord()}>Play Again</button>}
      </div>
      <div className="HangmanGame-hangman">
      <Hangman guesses={guesses} word={word} />
      </div>
    </div>
  );
};

export default HangmanGame;
