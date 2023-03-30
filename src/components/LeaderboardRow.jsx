import React, {useEffect, useState} from "react";
import {ref, getDatabase, onValue, get} from "firebase/database";
import { UserAuth } from "../context/AuthContext";


const LeaderboardRow = () => {

    const [LeaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const usersRef = ref(database, 'users/');
            const snapshot = await get(usersRef);
            const leaderboard = snapshot.val();
            const leaderboardArray = [];
            for (let userId in leaderboard) {
                const userScore = await calculateUserScore(userId);
                leaderboardArray.push(
                    {
                        place: 0,
                        name: leaderboard[userId].name,
                        date: '2021-05-01',
                        email: leaderboard[userId].email,
                        score: userScore,
                        student_id: leaderboard[userId].email.split('@')[0],
                    });
            }

            leaderboardArray.sort((a, b) => b.score - a.score);

            for (let i = 0; i < leaderboardArray.length; i++) {
                leaderboardArray[i].place = i + 1;
            }

            setLeaderboardData(leaderboardArray);
        }

        fetchData();
    }, []);

    const calculateUserScore = (user) => {
        let totalScore = 0;
        let sectionCount = 0;
        const database = getDatabase();
        const userRef = ref(database, 'progress/' + user);
        
        onValue(userRef, (snapshot) => {
          const progress = snapshot.val();
          for(let level in progress) {
            for(let section in progress[level]) {
              totalScore += progress[level][section].score;
              sectionCount++;
            }
          }
        });
        
        console.log("Scores: " + totalScore + " Sections: " + sectionCount + " Average: " + totalScore/sectionCount + "")
        return totalScore;
    }
      

    return (
        <tbody className="text-sm divide-y divide-slate-200">
            {LeaderboardData.map((item, index) => (
                <tr key={index}>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.place} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.name} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.date} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.email} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.score} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.student_id} </div>
                        </div>
                    </div>
                </td>
            </tr> 
            ))}
        
        </tbody>
    )

}

export default LeaderboardRow;
