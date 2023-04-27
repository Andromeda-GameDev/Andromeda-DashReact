import React from "react";
import AdminSidebar from "./AdminSidebar";
import HeaderPanel from "../components/headerPanel";
import AdminMainPanel from "../components/AdminMainPanel";

const Admin= () => {


    return (
        <div className="flex bg-gray-100 min-h-screen">

            <AdminSidebar />

            <div className="flex flex-col w-full ml-56">


                <HeaderPanel />
                <AdminMainPanel></AdminMainPanel>

            
            </div>
        </div>
    );
}

export default Admin;