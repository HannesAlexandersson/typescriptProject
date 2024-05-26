import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Title from './Title/Title';
import Navbar from './Navbar/Navbar';
import './App.css'
import PlayerVsAI from "./PlayerVsAI/PlayerVsAI";
import Scoreboard from './Scoreboard/Scoreboard';



function App() {
  const [gameMode, setGameMode] = useState<string>('Player VS Player');
  
  return (
    <main className="overlay">
      <Navbar setGameMode={setGameMode} gameMode={gameMode} />
      
      {gameMode === 'Player VS Player' && (
        <>
          
          <TicTacToe />
        </>
      )}
      {gameMode === 'Player VS AI' && (
        <>         
          <PlayerVsAI />
        </>
      )}
      <Title className="appTitle">Leaderboard:</Title>
      <Scoreboard />
    </main>
  );
}

export default App