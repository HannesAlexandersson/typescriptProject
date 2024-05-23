import { initializeApp } from 'firebase/app';
import { getDatabase, set, get, ref, child } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
}
const app = initializeApp(firebaseConfig);
getDatabase(app);

type ScoreResult = {
    score: string;
    username: string;
};

type ScoreData = {
    // we don't know how many results we will get, so this will be a dynamic type 
    [key: string]: ScoreResult;
};

export default function Score() {
    const [score, setScore] = useState<ScoreData>({});


    useEffect(() => {
        getUserData();
    },[])

    //get data
    function getUserData() {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                setScore(snapshot.val());
            } else {
                console.log("No data avaiable");
            }
        }).catch((Error) => {
            console.log(Error);
        });
    }

    return (
        <>
            <div>
                <div >Score Table</div>
            </div>
                { score && Object.keys(score).map(name => (
                <div key={name}>
                    {name} - {score[name].score}
                </div>
                ))
            }
    </>
    )
}