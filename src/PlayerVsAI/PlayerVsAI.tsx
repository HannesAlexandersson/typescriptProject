import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Button from '../Button/Button.tsx';
import { winnerPatterns } from '../../lib/utils/utils.ts';
import GameBoard from '../GameBoard/GameBoard.tsx';



function AiMode(){
   
    const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [status, setStatus] = useState<string>('');
    const [isExploding, setIsExploding] = useState<boolean>(false);
   
   

    function minimax(newSquares: string[], depth: number, isMaximizing: boolean): number {
        const winner = getWinner(newSquares);
        if (winner === 'X') return -10 + depth;
        if (winner === 'O') return 10 - depth; 
        if (newSquares.every(square => square !== '')) return 0; 
    
        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < newSquares.length; i++) {
            if (newSquares[i] === '') {
              newSquares[i] = 'O';
              const score = minimax(newSquares, depth + 1, false);
              newSquares[i] = '';
              bestScore = Math.max(score, bestScore);
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < newSquares.length; i++) {
            if (newSquares[i] === '') {
              newSquares[i] = 'X';
              const score = minimax(newSquares, depth + 1, true);
              newSquares[i] = '';
              bestScore = Math.min(score, bestScore);
            }
          }
          return bestScore;
        }
      }



    function handleClick(getCurrentSquare: number): void {
        if (squares[getCurrentSquare] || getWinner(squares)) return;
    
        const cpySquares: string[] = [...squares];
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setSquares(cpySquares);
        setIsXTurn(!isXTurn);
      }
    
   

      function computerMove(): void {
        let bestScore = -Infinity;
        let move = -1;
      
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === '') {
            squares[i] = 'O';
            const score = minimax(squares, 0, false);
            squares[i] = '';
            if (score > bestScore) {
              bestScore = score;
              move = i;
            }
          }
        }
      
        if (move !== -1) {
          handleClick(move);
        }
      }
    
    function getWinner(squares: string[]): string | null {
        for (let i = 0; i < winnerPatterns.length; i++) {
          const [x, y, z] = winnerPatterns[i];
          if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
            return squares[x];
          }
        }
        return null;
    }

    const handleRestart = (): void => {
    setIsXTurn(true);
    setSquares(Array(9).fill(''));
    setStatus('');
    setIsExploding(false);
    };

    //updates the game status whenever squares changes I.E whenever a player makes a move 
    useEffect(() => {
    const winner: string | null = getWinner(squares);
    if (winner) {
        setStatus(`Winner is ${winner}!!!`);
        setIsExploding(true);
    } else if (squares.every(item => item !== '')) {
        setStatus('This is a draw! Please restart the game!');
    } else {
        setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`);
    }
    }, [squares]);

    // triggers the AI move, also set an delay on the AI move for better user experience
    useEffect(() => {
    if (!isXTurn) {
        const timeoutId = setTimeout(computerMove, 500);
        return () => clearTimeout(timeoutId);
    }
    }, [isXTurn, squares]);
    
    

    return(
        <div className="ticTacToe-container"> 
        <h1>{status}</h1>
        {isExploding && <ConfettiExplosion />}
        
          <GameBoard squares={squares} onClick={handleClick} />
            
          <Button onClick={handleRestart} className='restart-btn'>Restart Game</Button>
        </div>
    );
}

export default AiMode