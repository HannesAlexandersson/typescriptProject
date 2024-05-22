import { useState, ChangeEvent } from 'react';
import { login, Signup } from '../../apiFunctions/User.ts';
import Button from '../Button/Button.tsx';
import style from './login.module.css';


type HandleClickType = (value: boolean) => void;
type LoginProps = {
    setLoggedIn: HandleClickType;
    onClose: () => void;
  };

function Login({ setLoggedIn, onClose }: LoginProps){  
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string>('');
        

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    async function SignIn() {
        const promise = login(email, password);
        promise.then(() => setLoggedIn(true));
    }

    async function handleSignup(){
        const promise = Signup(email, password);
        promise.then(() => setLoggedIn(true));
    }
        
    return(                
           
        <div className={style.main}> 

            <div className={style.content_wrapper}>
                <div className={style.close}>
                <Button onClick={onClose} className={style.close_btn} ><h1>X</h1></Button>
                </div>
                <div className={style.content_text}>
                    <h1>Sign in</h1>                    
                </div>
                
                <form className={style.formfield}>
                    
                    <div className={style.inputbox}>
                        <label className={style.label} htmlFor='username' >Username</label> 
                        <input className={style.inputfield} name="username" placeholder="Your mail" value={email} onChange={handleUsernameChange} />
                    </div>
                    <div className={style.inputbox}>
                        <label className={style.label} htmlFor='password' >Password</label>
                        <input className={style.inputfield} type="password" name="password" placeholder="Password"  value={password} onChange={handlePasswordChange} />
                    </div>
                </form>
                <div className={style.content_btn_wrapper}   >                   
                    <Button onClick={() => SignIn()} className={style.content_btn} >Sign in</Button> 
                </div>
                {errors ? (<div className={style.error}><p>{errors}</p></div>) : (<span></span>)}

                <div className={style.content_text}>
                    <h4>or</h4>
                    <h1>Sign up to be able to play</h1>                    
                </div>
                <div className={style.content_btn_wrapper}>
                    <Button onClick={() => handleSignup()} className={style.content_btn} >CREATE ACCOUNT</Button>                    
                </div>
                
            </div>          
           
        </div>
   
    );
}

export default Login