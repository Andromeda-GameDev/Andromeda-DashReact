import React from "react";
import AdminSidebar from "./AdminSidebar";
import CRUD_users from "./CRUD_users";

const AdminProfessorsCRUD = () => {
    return(
        <div className="flex bg-gray-100">
            <AdminSidebar/>
            <div className="flex flex-col w-full ml-56">
                <CRUD_users type_user={"professors"}/>
            </div>
        </div>

    );
}
export default AdminProfessorsCRUD;