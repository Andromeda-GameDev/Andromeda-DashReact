import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import StudentSideBar from "../components/StudentSideBar";
import CardStudentGroup from "../components/CardStudentGroup";
import { getDatabase,ref, get} from "firebase/database";
import { async } from "@firebase/util";

const Student = () => {

    const {user, logout } = UserAuth();
    const navigate = useNavigate();

    const [studentInfo, setStudentInfo] = useState({});
    const [theGroupName, setGroupName] = useState("");

    const getNameOfGroup = async (id) => {

        const db = getDatabase();
        const professorsRef = ref(db, "professors");
      
        const snapshot = await get(professorsRef);
      
        if (!snapshot.exists()) {
          console.log("No data available");
          return null;
        }
      
        const professorsData = snapshot.val();
      
        for (const professorKey in professorsData) {
          const groups = professorsData[professorKey].groups;
          for (const groupKey in groups) {
            if (groups[groupKey].Id === id) {
                setGroupName(String(groups[groupKey].name));
              return groups[groupKey].name;
            }
          }
        }
      
        console.log(`No group found with Id ${id}`);
        return null;
    };

    useEffect(() => {
        const db = getDatabase();
        const userDataRef = ref(db, `users/${user.uid}/`);
        get(userDataRef).then((snapshot) => {
            const dataObj = snapshot.val() || {};
            console.log(dataObj);
            setStudentInfo(dataObj);
            getNameOfGroup(dataObj.group);
        });
    }, [user]);
    

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log("You are logged out")
        } catch (error) {
            console.log(error.message);
        }
    }

    // <button onClick={handleLogout} className='border px-6 py-2 my-4'> Logout </button>

    return (
        <div className = 'flex bg-gray-100'> 
            <div className="flex">
                <StudentSideBar />
            </div>
            <div className="flex-col w-full">
                <div className="flex flex-col h-40 justify-center">
                    <h1 className = 'pl-8 text-2xl font-bold'> Bienvenido {studentInfo.name} ! </h1>
                </div>
                <div className="pl-8">
                    <CardStudentGroup name_group={theGroupName} id_group={studentInfo.group}/>
                </div>
            </div>

        </div>
    );
}

export default Student;