import { initializeApp } from 'firebase/app';
import { getDatabase, set, get, ref, update } from 'firebase/database';
import { useState } from 'react';
import Button from '../Button/Button';

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
}
const app = initializeApp(firebaseConfig);
getDatabase(app);


export default function UserName() {
    const [userName, setUserName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const saveName = () => {
        sessionStorage.setItem('userName', userName);
    };

    // Add or update user score
    function writeUserData(userName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            const db = getDatabase();
            const userRef = ref(db, 'users/' + userName);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    // User exists - update the score
                    const currentData = snapshot.val();
                    const newScore = currentData.score + 1;
                    update(userRef, {score: newScore });
                    resolve(true);
                } else {
                    // User doesn't exsist - add new entry
                    set(userRef, {
                        username: userName,
                        score: 1
                    }).then(() => {
                        resolve(true);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            }).catch((error) => {
                reject(error);
            })
        });
    };

    const handleSaveClick = () => {
        saveName();
        writeUserData(userName).then((success) => {
            if(success) {
                setMessage('Your score is now saved!');
            } else {
                setMessage('Username already taken. Please choose another name.')
            }
        });
    };


    return (
        <div style={{
                position: "absolute", 
                top: "50%", 
                left: "50%",
                transform: "translate(-50%) translate(-50%)",
                width: "200px",
                backgroundColor: "white",
                padding: "20px"
            }}>
            <div>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <Button onClick={() => handleSaveClick()} className='restart-btn'>Save</Button>
            {message && <p>{message}</p>}
        </div>
    )
}