import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import StudentSideBar from "../components/StudentSideBar";
import { getDatabase, ref, get } from "firebase/database";
import HeaderPanel from "./headerPanel";
import { Announcements } from "./Announcements";
import StudentProgress from "../components/StudentProgress";

const StatisticsStudent = () => {
    const { user } = UserAuth();
    const [progressData, setProgressData] = useState({});
    const [levelData, setLevelData] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const progressDataRef = ref(db, `progress/${user.uid}/`);
        const levelDataRef = ref(db, `levels/`);

        // Fetch progress data and level data
        Promise.all([get(progressDataRef), get(levelDataRef)]).then(([progressSnapshot, levelSnapshot]) => {
            setProgressData(progressSnapshot.val() || {});
            setLevelData(levelSnapshot.val() || {});
        });
    }, [user]);

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <div className="flex">
                <StudentSideBar />
            </div>
            <div className="flex flex-col w-full">
                <HeaderPanel />

                {/* Here goes the components with the data */}
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4"> Tu progreso </h1>
                    <StudentProgress progressData={progressData} levelData={levelData} />
                </div>
            </div>
        </div>
    );
};

export default StatisticsStudent;
