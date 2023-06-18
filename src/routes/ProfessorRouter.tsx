import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { Sidebar} from "../components/Sidebar";
import * as Styled from "./styles";
import {HeaderPanel} from "../components/Header";
const ProfessorRouter = () => {
    const [role, setRole] = React.useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        setRole(auth.role as string);
    }, [auth.role]);

    React.useEffect(() => {
        if(role === null){
            //navigate("/")
        }

        if (role !== "professor") {
            //navigate(-1);
        }
    }, [role, navigate]);


    const iconLabels = [
        { to: "/professor", label: "Inicio" },
        { to: "/professor/groups", label: "Grupos" },
        { to: "/professor/statistics", label: "Estadísticas" },
        { to: "/professor/settings", label: "Ajustes" },
    ];

    return (
        <Styled.ProfessorRouterContainer>
            <Styled.SidebarContainer>
                <Sidebar iconLabels={iconLabels} />
            </Styled.SidebarContainer>
            <Styled.ContentContainer>
                <HeaderPanel />
                <Outlet />
            </Styled.ContentContainer>
        </Styled.ProfessorRouterContainer>
    );
};

export default ProfessorRouter;