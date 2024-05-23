import { initializeApp } from 'firebase/app';
import { getDatabase, set, get, ref, update } from 'firebase/database';
import { useState } from 'react';

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

    //add a user
    function writeUserData(userName: string) {
        const db = getDatabase();
        // set(ref(db, 'users/' + userName), {
        //     username: userName,
        //     score: 1
        // });
        const userRef = ref(db, 'users/' + userName);

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                // User exists - update the score
                const currentData = snapshot.val();
                const newScore = currentData.score + 1;
                update(userRef, {score: newScore });
            } else {
                // User doesn't exsist - create user
                set(userRef, {
                    username: userName,
                    score: 1
                });
            }
        });
    };

    const handleSaveClick = () => {
        saveName();
        writeUserData(userName)
    }



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
            <button
                onClick={ () => handleSaveClick() }>Save
            </button>
            {message && <p>{message}</p>}
        </div>
    )
}