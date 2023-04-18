import React from "react";
import AdminSidebar from "./AdminSidebar";
import CRUD_users from "./CRUD_users";
import HeaderPanel from "./headerPanel";

const AdminUsersCRUD = () => {
    return(
        <div className="flex bg-gray-100">
            <AdminSidebar/>
            <div className="flex flex-col w-full ml-56">
                <HeaderPanel />
                <CRUD_users type_user={"users"}/>
            </div>
        </div>

    );
}
export default AdminUsersCRUD;