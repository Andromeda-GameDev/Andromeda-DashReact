import React from "react";
import CRUD_users from "./CRUD_users";
import EnableDBCard from "./EnbleDBCard";
import AdminMainPanel from "./AdminMainPanel";
import HeaderPanel from "./headerPanel";

const PrubesComponent = () => {
    return(
        <div>
            <HeaderPanel />
            <AdminMainPanel/>
        </div>
    );
};
export default PrubesComponent;