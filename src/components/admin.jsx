import React, {useEffect, useState} from "react";
import {ref, getDatabase, onValue} from "firebase/database";
import { UserAuth } from "../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import HeaderPanel from "../components/headerPanel";

const Admin= () => {


    return (
        <div className="flex bg-gray-100">

            <AdminSidebar />

            <div className="flex flex-col w-full ml-56">

            <HeaderPanel />

            
    </div>
</div>
      
    )
}

export default Admin;