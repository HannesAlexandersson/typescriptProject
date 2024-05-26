import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Button from '../Button/Button.tsx';
import { winnerPatterns } from '../../lib/utils/utils.ts';
import Score from '../Score/Score.tsx';
import NameForm from '../NameForm/NameForm.tsx';
import GameBoard from '../GameBoard/GameBoard.tsx';


function TicTacToe(): React.ReactNode{    
    const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [status, setStatus] = useState<string>('');
    const [isExploding, setIsExploding] = useState<boolean>(false);    
    const [isWinner, setIsWinner] = useState<boolean>(false);
    const [showNameForm, setShowNameForm] = useState<boolean>(false);
    
    function handleClick(getCurrentSquare: number): void {
        const cpySquares: string[] = [...squares];
        if(getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setIsXTurn(!isXTurn);
        setSquares(cpySquares);
    }

    function hideNameForm(): void {
        setShowNameForm(false);
    }
    
    function getWinner(squares: string[]): string | null {
       
        for(let i = 0; i < winnerPatterns.length; i++){
            const [x,y,z] = winnerPatterns[i];
            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]){
                return squares[x]
            }
        }
        return null
    }

    function handleRestart(): void{
        setIsXTurn(true)
        setSquares(Array(9).fill(''))
        setIsExploding(false)     
        setIsWinner(false);  
        setShowNameForm(false); 
    }

   

    useEffect(() => {
        if(!getWinner(squares) && squares.every(item => item !== '')){
            setStatus(`This is a draw! Please restart the game!`)
        }else if(getWinner(squares)){
            setIsWinner(true);
            setShowNameForm(true);
            setIsExploding(true);
            setStatus(`Winner is ${getWinner(squares)}!!!`);            
        }else{
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`)
        }

        
    }, [squares, isXTurn]);

    return(
        <div className="ticTacToe-container"> 
        <h1>{status}</h1>
        {isExploding && <ConfettiExplosion />}

            {isExploding && <ConfettiExplosion />}

            <GameBoard squares={squares} onClick={handleClick} />
           
        
           
           
            { showNameForm && <NameForm hide={hideNameForm} />}         
            <Button onClick={handleRestart} className='restart-btn'>Restart Game</Button>
            { isWinner && <Score /> }  
        </div>

    );
}

export default TicTacToe