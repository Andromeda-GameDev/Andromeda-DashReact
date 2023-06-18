import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import * as Styled from "./styles";
import {Sidebar} from "../components/Sidebar";
import {HeaderPanel} from "../components/Header";

const StudentRouter = () => {
    const [role, setRole] = React.useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        setRole(auth.role as string);
    }, [auth.role]);

    React.useEffect(() => {
        if (role !== "student" && role !== null) {
            navigate(-1);
        }
    }, [role, navigate]);


    const iconLabels = [
        { to: "/student", label: "Inicio" },
        { to: "/student/statistics", label: "Estadísticas" },
        { to: "/student/settings", label: "Ajustes" },
    ];

    return (
        <Styled.StudentRouterContainer>
            <Styled.SidebarContainer>
                <Sidebar iconLabels={iconLabels} />
            </Styled.SidebarContainer>
            <Styled.ContentContainer>
                <HeaderPanel />
                <Outlet />
            </Styled.ContentContainer>
        </Styled.StudentRouterContainer>
    );
}

export default StudentRouter;