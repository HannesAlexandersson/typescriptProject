import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import logo from '/logo.png';
import Title from '../Title/Title';
import { GameMode } from "../../lib/utils/utils";
import style from './nav.module.css';



/* type NavbarProps = {      
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameMode: string;
  }; */
  interface NavbarProps {
    gameMode: GameMode;
    setGameMode: (mode: GameMode) => void;
  }

function Navbar({ setGameMode, gameMode }: NavbarProps): React.ReactNode{  
  const [activeButton, setActiveButton] = useState<string | null>('P1 VS P2');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  useEffect(() => {
    setActiveButton(gameMode); // to make the 'normal' btn be active as default from first render
  }, [gameMode]);

  function handleSetNormal(): void{    
    setGameMode(GameMode.PlayerVsPlayer);
    setActiveButton(GameMode.PlayerVsPlayer);    
}

function handleSetComputer(): void{
    setGameMode(GameMode.PlayerVsComputer);
    setActiveButton(GameMode.PlayerVsComputer);   
} 

function handleSetScoreBoard(): void{
  setGameMode(GameMode.ScoreBoard);
  setActiveButton(GameMode.ScoreBoard);   
} 

    return (
        <div className={style.navWrapper}> 
                    
           <ul className={style.list} >
            <div className={style.dropdownCont}>
            <Button onClick={toggleDropdown} className={`${style.gameModeBtn} ${style.Dropdown}`}>MENU</Button>
            {dropdownOpen && (
               <div className={style.BtnGroup}>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'P1 VS P2' ? style.active : ''}`} onClick={handleSetNormal}>1 v 1</Button>
                </li>                
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'P1 VS AI' ? style.active : ''}`} onClick={handleSetComputer}>P1 vs AI</Button>
                </li>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'Score board' ? style.active : ''}`} onClick={handleSetScoreBoard}>Score board</Button>
                </li>
              </div>
              )}
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