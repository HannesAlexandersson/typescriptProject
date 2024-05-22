import { MouseEventHandler, useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Square from '../Square/Square.tsx';
import Button from '../Button/Button.tsx';
import { getRandomInt, winnerPatterns } from '../../lib/utils/utils.ts';



function AiMode(){
   
    const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [status, setStatus] = useState<string>('');
    const [isExploding, setIsExploding] = useState<boolean>(false);
    const [isVsComputer, setIsVsComputer] = useState<boolean>(true);
    const [isComputerTurn, setIsComputerTurn] = useState<boolean>(false);



    function handleClick(getCurrentSquare: number): void {
        if (squares[getCurrentSquare] || getWinner(squares)) return;
    
        const cpySquares: string[] = [...squares];
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setSquares(cpySquares);
        setIsXTurn(!isXTurn);
      }
    
      
      function computerMove() {
        const emptySquares: number[] = squares
          .map((val: string, index: number) => (val === '' ? index : -1))
          .filter(val => val !== -1);
    
        if (emptySquares.length > 0) {
          const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const cpySquares: string[] = [...squares];
          cpySquares[randomIndex] = 'O';
          setSquares(cpySquares);
          setIsXTurn(true);
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
    
      useEffect(() => {
        if (!isXTurn && isVsComputer) {
          const timeoutId = setTimeout(computerMove, 500); // Delay AI move for better UX
          return () => clearTimeout(timeoutId);
        }
      }, [isXTurn, squares, isVsComputer]);
    
    

    return(
        <div className="ticTacToe-container"> 
        <h1>{status}</h1>
        {isExploding && <ConfettiExplosion />}
        
            <div className="row">
                <Square value={squares[0]} onClick={()=> handleClick(0)}/>
                <Square value={squares[1]} onClick={()=> handleClick(1)}/>
                <Square value={squares[2]} onClick={()=> handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={()=> handleClick(3)}/>
                <Square value={squares[4]} onClick={()=> handleClick(4)}/>
                <Square value={squares[5]} onClick={()=> handleClick(5)}/>
            </div>
            <div className="row">
                <Square value={squares[6]} onClick={()=> handleClick(6)}/>
                <Square value={squares[7]} onClick={()=> handleClick(7)}/>
                <Square value={squares[8]} onClick={()=> handleClick(8)}/>
            </div>            
            <Button onClick={handleRestart} className='restart-btn'>Restart Game</Button>
        </div>
    );
}

export default AiMode