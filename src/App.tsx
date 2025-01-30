import { useState } from 'react';
import './App.scss';
import Game from './Game';
import { faker } from '@faker-js/faker';

export default function App() {
  const [word, setWord] = useState(faker.word.sample({ length: { min: 5, max: 10 } }).toLowerCase());

  const [gameId, setGameId] = useState(faker.string.uuid);

  const playAgain = () => {
    setWord(faker.word.sample({ length: { min: 5, max: 10 } }).toLowerCase());
    setGameId(faker.string.uuid());
  };

  return (
    <div className="app">
      <Game key={gameId} word={word} lives={10} onPlayAgainClicked={playAgain} />
    </div>
  );
}
