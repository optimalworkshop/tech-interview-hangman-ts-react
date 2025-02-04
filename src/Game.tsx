import { useCallback, useEffect, useReducer, useState } from 'react';
import './Game.scss';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface GameProps {
  word: string;
  lives: number;
  onPlayAgainClicked: () => void;
}

export default function Game({ word, lives, onPlayAgainClicked }: GameProps) {
  const [actualLives, setActualLives] = useState(lives);

  const [guesses, addGuess] = useReducer((set: Set<string>, letter: string) => new Set<string>(set).add(letter), new Set<string>());

  const masked = word
    .split('')
    .map(letter =>
      guesses.has(letter) || LETTERS.indexOf(letter.toUpperCase()) === -1 ? letter : '_'
    );

  const guess = (letter: string) => {
    if (word.indexOf(letter.toLowerCase()) === -1) {
      setActualLives(actualLives - 1);
    }
    addGuess(letter.toLowerCase());
  };

  const gameIsWon = word
    .split('')
    .every(
      letter => guesses.has(letter.toLowerCase()) || LETTERS.indexOf(letter.toUpperCase()) === -1
    );

  const gameIsLost = actualLives === 0;

  useEffect(() => {
    const keyPressed = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (LETTERS.indexOf(letter) !== -1) {
        guess(letter);
      }
    };
    window.addEventListener('keypress', keyPressed);
  }, [guess]);

  return (
    <div className="game">
      <h1>Hangman</h1>
      <p className="actualLives">You have {actualLives} lives left.</p>
      {gameIsWon && <p className="won">You won the game!</p>}
      {gameIsLost && (
        <p className="lost">
          You lost the game! The word was <b>{word.toUpperCase()}</b>
        </p>
      )}
      <div className="masked">{masked}</div>
      <div className="keyboard">
        {LETTERS.map(letter => (
          <button
            key={letter}
            disabled={guesses.has(letter.toLowerCase())}
            onClick={() => guess(letter.toLowerCase())}
          >
            {letter}
          </button>
        ))}
      </div>
      {(gameIsWon || gameIsLost) && (
        <button className="play-again-button" onClick={onPlayAgainClicked}>
          Play again
        </button>
      )}
    </div>
  );
};
