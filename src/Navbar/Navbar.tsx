import style from './nav.module.css';

type HandleClickType = (value: boolean) => void;
type NavbarProps = {  
    loggedIn: boolean;
    setLoggedIn: HandleClickType;
  };
function Navbar({ setLoggedIn, loggedIn }: NavbarProps){

    const handleLoginClick = () => {
        setLoggedIn(true);
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