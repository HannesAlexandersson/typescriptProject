import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Title from './Title/Title';
import Navbar from './Navbar/Navbar.tsx';
import './App.css'
import PlayerVsAI from "./PlayerVsAI/PlayerVsAI.tsx";



function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);//switch to false in production or when login logic works
  const [gameMode, setGameMode] = useState<string>('normal');
  
  return (
    <main className="overlay">
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} setGameMode={setGameMode} gameMode={gameMode} />
      {loggedIn && gameMode === 'normal' && (
        <>
          <Title>Player vs Player</Title>
          <TicTacToe />
        </>
      )}
      {loggedIn && gameMode === 'computer' && (
        <>
          <Title>Player vs AI</Title>
          <PlayerVsAI />
        </>
      )}
      {!loggedIn && <Title>Please log in or sign up to play the game.</Title>}
    </main>
  );
}

export default App