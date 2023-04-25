import React, { useState } from "react";
import HangmanGame from "./HangmanGame";

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState("");

  return (
    <div>
      <h1>Hang-ten</h1>
      <HangmanGame guesses={guesses} setGuesses={setGuesses} word={word} setWord={setWord} />
    </div>
  );
};

export default App;