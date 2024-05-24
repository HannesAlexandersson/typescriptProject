import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Title from './Title/Title';
import Navbar from './Navbar/Navbar.tsx';
import './App.css'
import PlayerVsAI from "./PlayerVsAI/PlayerVsAI.tsx";



function App() {
  const [gameMode, setGameMode] = useState<string>('normal');
  
  return (
    <main className="overlay">
      <Navbar setGameMode={setGameMode} gameMode={gameMode} />
      {gameMode === 'normal' && (
        <>
          <Title>Player vs Player</Title>
          <TicTacToe />
        </>
      )}
      {gameMode === 'computer' && (
        <>
          <Title>Player vs AI</Title>
          <PlayerVsAI />
        </>
      )}
      
    </main>
  );
}

export default App