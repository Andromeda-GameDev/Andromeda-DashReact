import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import logo from "../resources/openai-logo.png";


export default function Sidebar() {

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

        <div className="flex">
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

            <div className="min-h-screen flex flex-row bg-gray-100">
            <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
                <div className="flex items-center justify-center h-20 shadow-md">
                    <img src={logo} alt="Andromeda-logo" className="w-10 h-10 mr-2" />
                    <h1 className="text-2xl text-indigo-500">Andromeda</h1>
                </div>
                <ul className="flex flex-col py-4">
                <li>
                    <NavLink to='/professor' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-home"></i></span>
                    <span className="text-sm font-medium">Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/professor/groups' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-spreadsheet"></i></span>
                    <span className="text-sm font-medium">Groups</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/professor/statistics' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bar-chart"></i></span>
                    <span className="text-sm font-medium">Statistics</span>
                    </NavLink>
                </li>
                {/* <li>
                    <a href="#" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-cog"></i></span>
                    <span className="text-sm font-medium">Settings</span>
                    </a>
                </li> */}
                <li>
                    <button onClick={handleLogout} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                    <span className="text-sm font-medium">Logout</span>
                    </button>
                </li>
                </ul>
            </div>
            </div>
        </div>
    );
}