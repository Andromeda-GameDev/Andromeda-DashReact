import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

const PublicRouter = () => {
    return (
        <>
            <AuthContextProvider>
            <Outlet />
            </AuthContextProvider>
        </>
    )
}

export default PublicRouter;