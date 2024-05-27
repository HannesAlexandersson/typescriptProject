import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, set, get, ref, update, Database, DatabaseReference } from 'firebase/database';
import { useState } from 'react';
import Button from '../Button/Button';
import style from './nameForm.module.css';

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
}
const app: FirebaseApp = initializeApp(firebaseConfig);
getDatabase(app);


interface NameFormType {
    hide: () => void;
}


export default function NameForm({ hide }: NameFormType): React.ReactNode {
    const [userName, setUserName] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    // Add or update user score
    function writeUserData(userName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            const db: Database = getDatabase();
            const userRef: DatabaseReference = ref(db, 'users/' + userName);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    // User exists - update the score
                    const currentData = snapshot.val();
                    const newScore: number = currentData.score + 1;
                    update(userRef, {score: newScore });
                    resolve(true);
                } else {
                    // User doesn't exist - add new entry
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
    }

    const handleSaveClick = () => {
        writeUserData(userName).then((success) => {
            if(success) {
                setMessage('Your score is now saved!');
                hide();
            }
        });
    }


    return (
        <div className={style.container}>
            <div className={style.centered}>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div className={style.button}>
            <Button onClick={() => handleSaveClick()} className='restart-btn'>Save</Button>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}