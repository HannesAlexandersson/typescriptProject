import { useState } from 'react';
import Login from '../Login/Login';
import style from './nav.module.css';

type HandleClickType = (value: boolean) => void;
type NavbarProps = {  
    loggedIn: boolean;
    setLoggedIn: HandleClickType;
  };
function Navbar({ setLoggedIn, loggedIn }: NavbarProps){
  const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleClosePopup = () => {
      setShowPopup(false); 
    };  

    const handleLoginClick = () => {
       /*  setLoggedIn(true); */
       setShowPopup(true);
      };
    
      const handleLogoutClick = () => {
        setLoggedIn(false);
      };

    return (
        <div className={style.navWrapper}>
           <ul className={style.list} >
               <li>
                   <a className={style.links} href="/">Home</a>
               </li>
               <li>
               {!loggedIn ? (
                   <button className={style.signInBtn} onClick={handleLoginClick}>                    
                        <p>Sign in</p>
                        {showPopup && <Login onClose={handleClosePopup} />}
                    </button>
                    ): (
                    <button className={style.signInBtn} onClick={handleLogoutClick}>
                        <p>Sign out</p>
                    </button>
                    )}
                    
               </li>      
           </ul>
        </div>
        
       );
     }
export default Navbar