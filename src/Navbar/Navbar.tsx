import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import logo from '/logo.png';
import Title from '../Title/Title';
import style from './nav.module.css';


type NavbarProps = {  
    
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameMode: string;
  };

function Navbar({ setGameMode, gameMode }: NavbarProps){  
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  useEffect(() => {
    setActiveButton(gameMode); // to make the 'normal' btn be active as default from first render
  }, [gameMode]);

  function handleSetNormal(): void{    
    setGameMode('Player VS Player');
    setActiveButton('Player VS Player');    
}

function handleSetComputer(): void{
    setGameMode('Player VS AI');
    setActiveButton('Player VS AI');   
} 


    return (
        <div className={style.navWrapper}> 
                    
           <ul className={style.list} >
            
               <div className={style.BtnGroup}>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'Player VS Player' ? style.active : ''}`} onClick={handleSetNormal}>1v1</Button>
                </li>                
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'Player VS AI' ? style.active : ''}`} onClick={handleSetComputer}>vs AI</Button>
                </li>
              </div>
              <div>
                <Title className={style.navTitle}>{gameMode}</Title>              
              </div>
              <div className={style.logoCont}>                                
                    <img src={logo} alt="logo" />                   
               </div>   
           </ul>
        </div>
        
       );
     }
export default Navbar