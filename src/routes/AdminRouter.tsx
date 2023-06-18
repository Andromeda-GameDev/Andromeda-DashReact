import React from "react";
import { Outlet } from "react-router-dom";

const AdminRouter = () => {
    return (
        <>
            <div> Admin Router </div>
            <Outlet />
        </>
    )
}

export default AdminRouter;
