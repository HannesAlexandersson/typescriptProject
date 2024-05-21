import Square from '../Square/Square.jsx';
import { useEffect, useState } from 'react';

function TicTacToe(){
    //create a container div
    //create a div for each row, give them classname of row
    //for each row, we will have 3 squares,we do this with a new component. inside that comp we define the component as a button with a value child
    
    //then we can call the square component in the parent component 3times

    // we need to useState on the squares in order to apply the effect when user clicks it
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');
    
    function handleClick(getCurrentSquare){
        let cpySquares = [...squares];
        if(getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
        cpySquares[getCurrentSquare] = isXTurn ? 'X' : 'O';
        setIsXTurn(!isXTurn);
        setSquares(cpySquares);
    }
//we also need to calculate the winner, all winnable patterns:
    function getWinner(squares){
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

    function handleRestart(){
        setIsXTurn(true)
        setSquares(Array(9).fill(''))
    }


    useEffect(() => {
        if(!getWinner(squares) && squares.every(item => item !== '')){
            setStatus(`This is a draw! Please restart the game!`)
        }else if(getWinner(squares)){
            setStatus(`Winner is ${getWinner(squares)}!!!`)
        }else{
            setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`)
        }
    }, [squares, isXTurn]);
    return(
        <div className="ticTacToe-container">  
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
            <button onClick={handleRestart} className='restart-btn'>Restart Game</button>
        </div>

    );
}

export default TicTacToe