import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import StudentSideBar from "../components/StudentSideBar";
import { CardStudentGroup, CardStudentNoGroup } from "../components/CardStudentGroup";
import { getDatabase,ref, get} from "firebase/database";
import HeaderPanel from "./headerPanel";
import Announcements from "./Announcements";
//import { async } from "@firebase/util";

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
    }, [user, theGroupName]);

    const getIntoNewGroup = (newGroup) => {
        setGroupName(newGroup);
    }
    const deletedAGroup = () => {
        setGroupName("");
    }
    

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

    // src/pages/Student.js

// ... rest of the code ...

    return (
        <div className="flex bg-gray-100">
            <div className="flex">
                <StudentSideBar />
            </div>
            <div className="flex-col w-full">
                <HeaderPanel />

                <div className="relative">
                    <img
                        src="https://www.publicdomainpictures.net/pictures/140000/velka/banner-header-1449745071UBW.jpg"
                        alt="Banner"
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-16 left-0 mt-10 ml-8">
                        <h1 className="text-2xl font-bold text-white bg-black">
                            Bienvenido a tu panel de Andromeda, {studentInfo.name}!
                        </h1>
                    </div>
                    <div className="absolute top-0 -right-80 mt-10 mr-8 w-1/2">
                        {theGroupName === "" ? (
                            <CardStudentNoGroup
                                methodGetIntoGroup={getIntoNewGroup}
                                the_user_id={user.uid}
                            />
                        ) : (
                            <CardStudentGroup
                                name_group={theGroupName}
                                id_group={studentInfo.group}
                                the_user_id={user.uid}
                                methodDeleteGroup={deletedAGroup}
                            />
                        )}
                    </div>
                </div>

                <Announcements />
            </div>
        </div>
    );

}

export default Student;