import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, get, ref, child } from 'firebase/database';
import { useState, useEffect } from 'react';
import style from './score.module.css'

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
}
const app: FirebaseApp = initializeApp(firebaseConfig);
getDatabase(app);

type ScoreResult = {
    score: string;
    username: string;
};

type ScoreData = {
    // we don't what the keys will be since, they are basen on the user input (their username), so this will be a dynamic type and the result witll look like this ->
    [key: string]: ScoreResult;
};

export default function Score(): React.ReactNode {
    const [score, setScore] = useState<ScoreData>({});


    useEffect(() => {
        getUserData();
    },[])

    //get data
    function getUserData(): void {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                setScore(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((Error) => {
            console.log(Error);
        });
    }

    return (
        <>
            <div className={style.score}>     
                {score && Object.keys(score).map(name => (
                    <div key={name}>
                        {name} - {score[name].score}
                    </div>
                ))
                }
            </div>
    </>
    )
}