import { useState} from "react";
import TicTacToe from "./TicTacToe/TicTacToe";
import Title from './Title/Title';
import Navbar from './Navbar/Navbar.tsx';
import './App.css'



function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);//switch to false in production or when login logic works
  
  return (
    <>
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      {loggedIn && (
        <>
          <Title>Tic Tac Toe</Title>
          <TicTacToe />
        </>
      )}
      {!loggedIn && <Title>Please log in to play the game.</Title>}
    </>
  );
}

export default App