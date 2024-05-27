import { useState, useEffect, useRef } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, get, ref, child } from 'firebase/database';
import style from './scoreboard.module.css';
import Title from '../Title/Title';

const firebaseConfig = {
    databaseURL: "https://tictactoe-3349b-default-rtdb.europe-west1.firebasedatabase.app",
};
const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

type ScoreResult = {
    score: string;
    username: string;
};



function Scoreboard(): React.ReactNode {  
    const [scores, setScores] = useState<ScoreResult[]>([]);
    const titleContainerRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState<number>(0);

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (titleContainerRef.current) {
            const containerWidth: number = titleContainerRef.current.scrollWidth + 10; //here we adjust the width of the pseudo container
            const duration: number = containerWidth / 100; //here we set the speed of the animation
            setAnimationDuration(duration);
        }
    }, [scores]);

    function getUserData() {
        const dbRef = ref(database);
        get(child(dbRef, 'users/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const scoresArray: ScoreResult[] = Object.keys(data).map(key => ({
                    username: key,
                    score: data[key].score,
                }));
                setScores(scoresArray); 
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <>
            <Title className="appTitle" >Leaderboard:</Title>
            <div className={style.header}>
                <div 
                    className={style.titleContainer} 
                    ref={titleContainerRef}
                    style={{ animationDuration: `${animationDuration}s` }}
                >
                    {scores.map((name, index) => (
                        <div key={name.username} className={style.titleWrapper} aria-hidden="true" > 
                            <h1>{index + 1}: {name.username} - {name.score} p </h1>            
                        </div>
                    ))}                 
                  
                </div>             
            </div>
        </>
    );
}

export default Scoreboard;