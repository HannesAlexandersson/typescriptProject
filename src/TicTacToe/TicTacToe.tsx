import { MouseEventHandler, useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Square from '../Square/Square.tsx';
import Button from '../Button/Button.tsx';



function TicTacToe(){    
    const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState<boolean>(true);
    const [status, setStatus] = useState<string>('');
    const [isExploding, setIsExploding] = useState<boolean>(false);
    const [gameMode, setGameMode] = useState<string>('normal');
    const [activeButton, setActiveButton] = useState<string | null>(null);
   
    
    
    function handleClick(getCurrentSquare: number): void {
        const cpySquares: string[] = [...squares];
        if(getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setIsXTurn(!isXTurn);
        setSquares(cpySquares);
    }
    //winnable patterns:
    function getWinner(squares: string[]): string | null {
        const winnerPatterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
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
    }

    function handleSetNormal(): void{
        console.log('click');
        setGameMode('normal');
        setActiveButton('normal');
        handleRestart();
    }
    function handleSetOnline(): void{
        setGameMode('online');
        setActiveButton('online');
        handleRestart();
    }
    function handleSetComputer(): void{
        setGameMode('computer');
        setActiveButton('computer');
        handleRestart();
    }


    useEffect(() => {
        if(!getWinner(squares) && squares.every(item => item !== '')){
            setStatus(`This is a draw! Please restart the game!`)
        }else if(getWinner(squares)){
            setIsExploding(true);
            setStatus(`Winner is ${getWinner(squares)}!!!`)
        }else{
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`)
        }
    }, [squares, isXTurn]);
    return(
        <div className="ticTacToe-container"> 
        {isExploding && <ConfettiExplosion />}
        <div className="Btn-group">
            <Button className={`gamemode-btn ${activeButton === 'normal' ? 'active' : ''}`} onClick={handleSetNormal}>1v1</Button>
            <Button className={`gamemode-btn ${activeButton === 'online' ? 'active' : ''}`} onClick={handleSetOnline}>Online</Button>
            <Button className={`gamemode-btn ${activeButton === 'computer' ? 'active' : ''}`} onClick={handleSetComputer}>Single</Button>
        </div>
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
            <h1>{status}</h1>
            <Button onClick={handleRestart} className='restart-btn'>Restart Game</Button>
        </div>

    );
}

export default TicTacToe