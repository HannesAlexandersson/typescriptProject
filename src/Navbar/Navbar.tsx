import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Button from '../Button/Button';
import style from './nav.module.css';

type HandleClickType = (value: boolean) => void;
type NavbarProps = {  
    loggedIn: boolean;
    setLoggedIn: HandleClickType;
  };
function Navbar({ setLoggedIn, loggedIn }: NavbarProps){
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<string>('normal');
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

const handleClosePopup = (): void => {      
  setShowPopup(false); 
};  

const handleLoginClick = (): void => {
   /*  setLoggedIn(true); */
   setShowPopup(true);
  };

  const handleLogoutClick = (): void => {
    setLoggedIn(false);
  };
  


    return (
        <div className={style.navWrapper}>          
           <ul className={style.list} >
               <div className={style.BtnGroup}>
                <li>
                  <Button className={`${style.gamemodeBtn} ${activeButton === 'normal' ? style.active : ''}`} onClick={handleSetNormal}>1v1</Button>
                </li>
                <li>
                  <Button className={`${style.gamemodeBtn} ${activeButton === 'online' ? style.active : ''}`} onClick={handleSetOnline}>Online</Button>
                </li>
                <li>
                  <Button className={`${style.gamemodeBtn} ${activeButton === 'computer' ? style.active : ''}`} onClick={handleSetComputer}>Single</Button>
                </li>
              </div>

               <li>
               {!loggedIn ? (
                   <button className={style.signInBtn} onClick={handleLoginClick}>                    
                        <p>Sign in</p>                        
                    </button>
                    ): (
                    <button className={style.signInBtn} onClick={handleLogoutClick}>
                        <p>Sign out</p>
                    </button>
                    )}
                    {showPopup && <Login setLoggedIn={setLoggedIn} onClose={handleClosePopup} />}
               </li>      
           </ul>
        </div>
        
       );
     }
export default Navbar