import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Navbar from './Navbar/Navbar.tsx';
import './App.css'
import PlayerVsAI from "./PlayerVsAI/PlayerVsAI.tsx";
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
      
      <Scoreboard />
    </main>
  );
}

export default App