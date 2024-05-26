import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Navbar from './Navbar/Navbar';
import './App.css'
import PlayerVsAI from "./PlayerVsAI/PlayerVsAI";
import Scoreboard from './Scoreboard/Scoreboard';
import Score from "./Score/Score";



function App() {
  const [gameMode, setGameMode] = useState<string>('Player VS Player');
  
  return (
    <main className="overlay">
      <Navbar setGameMode={setGameMode} gameMode={gameMode} />
      
      {gameMode === 'P1 VS P2' && (
        <>
          <TicTacToe />
        </>
      )}
      {gameMode === 'Player VS AI' && (
        <>         
          <PlayerVsAI />
        </>
      )}
      {gameMode === 'Score board' && (
        <>         
          <Score />
        </>
      )}
      
      <Scoreboard />
    </main>
  );
}

export default App