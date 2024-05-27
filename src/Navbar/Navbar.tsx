import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import logo from '/logo.png';
import Title from '../Title/Title';
import style from './nav.module.css';



type NavbarProps = {      
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameMode: string;
  };

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
    setGameMode('P1 VS P2');
    setActiveButton('P1 VS P2');    
}

function handleSetComputer(): void{
    setGameMode('P1 VS AI');
    setActiveButton('P1 VS AI');   
} 

function handleSetScoreBoard(): void{
  setGameMode('Score board');
  setActiveButton('Score board');   
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