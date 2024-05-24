import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import logo from '../../public/logo.png';
import style from './nav.module.css';


type NavbarProps = {  
    
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameMode: string;
  };

function Navbar({ setGameMode, gameMode }: NavbarProps){
  const [showPopup, setShowPopup] = useState<boolean>(false); 
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  useEffect(() => {
    setActiveButton(gameMode); // to make the 'normal' btn be active as default from first render
  }, [gameMode]);

  function handleSetNormal(): void{    
    setGameMode('normal');
    setActiveButton('normal');    
}
function handleSetOnline(): void{
    setGameMode('online');
    setActiveButton('online');   
}
function handleSetComputer(): void{
    setGameMode('computer');
    setActiveButton('computer');   
} 

//app.logomakr.com/0N2Psm
    return (
        <div className={style.navWrapper}>          
           <ul className={style.list} >
            
               <div className={style.BtnGroup}>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'normal' ? style.active : ''}`} onClick={handleSetNormal}>1v1</Button>
                </li>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'online' ? style.active : ''}`} onClick={handleSetOnline}>Online</Button>
                </li>
                <li>
                  <Button className={`${style.gameModeBtn} ${activeButton === 'computer' ? style.active : ''}`} onClick={handleSetComputer}>vs AI</Button>
                </li>
              </div>
              
              <div className={style.logoCont}>
                                
                    <img src={logo} alt="logo" />
                   
               </div>   
           </ul>
        </div>
        
       );
     }
export default Navbar