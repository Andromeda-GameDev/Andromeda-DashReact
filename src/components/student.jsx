import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import StudentSideBar from "../components/StudentSideBar";

const Student = () => {

    const {user, logout } = UserAuth();
    const navigate = useNavigate();
    

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log("You are logged out")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className = 'flex bg-gray-100'> 
            <div className="flex">
                <StudentSideBar />
            </div>
            <div>
                <h1 className = 'text-2xl font-bold'> Panel de estudiante </h1>
                <p> User Email: {user && user.email} </p>
                <button onClick={handleLogout} className='border px-6 py-2 my-4'> Logout </button>
            </div>

        </div>
    );
}

export default Student;