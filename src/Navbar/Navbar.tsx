import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Button from '../Button/Button';
import style from './nav.module.css';

type HandleClickType = (value: boolean) => void;
type NavbarProps = {  
    loggedIn: boolean;
    setLoggedIn: HandleClickType;
    setGameMode: React.Dispatch<React.SetStateAction<string>>;
    gameMode: string;
  };

function Navbar({ setLoggedIn, loggedIn, setGameMode, gameMode }: NavbarProps){
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
            {loggedIn &&
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
              }
              <div className={style.signBtn}>
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
               </div>   
           </ul>
        </div>
        
       );
     }
export default Navbar