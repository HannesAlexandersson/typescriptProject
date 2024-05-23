import { initializeApp } from 'firebase/app';
import { getDatabase, set, get, ref, child } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
}
const app = initializeApp(firebaseConfig);
getDatabase(app);


export default function UsersName() {
    const [userName, setUserName] = useState<string>('');

    const saveName = () => {
        sessionStorage.setItem('userName', userName);
        
    }

    //add a user
    function writeUserData(userName: string, result: number) {
    const db = getDatabase();
    set(ref(db, 'users/' + userName), {
        username: userName,
        score: result
    });
};

    const handleSaveClick = () => {
        saveName();
        writeUserData(userName, 1)
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
        </div>
    )
}