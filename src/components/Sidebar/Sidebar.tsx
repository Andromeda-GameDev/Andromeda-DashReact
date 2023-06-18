import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { Home, ViewList, BarChart, Settings, ExitToApp } from "@mui/icons-material";
import logo from "../../resources/planet_andromeda_logo.png";
import * as Styled from "./styles";

interface SidebarLinkProps {
    to: string,
    label: string,
    icon: React.ReactNode
}

function SidebarLink({ to, label}: SidebarLinkProps) {
    const location = useLocation();
    const isactive = location.pathname === to;

    let icon: React.ReactNode;
    switch (label) {
        case "Inicio":
            icon = <Home />;
            break;
        case "Grupos":
            icon = <ViewList />;
            break;
        case "Estadísticas":
            icon = <BarChart />;
            break;
        case "Ajustes":
            icon = <Settings />;
            break;
        default:
            icon = null;
    }

    return (
        <li>
            <Styled.SidebarLink to={to} isactive={isactive.toString()}>
                {isactive && <Styled.SidebarActiveIndicator isactive={isactive.toString()} />}
                <Styled.SidebarIcon>{icon}</Styled.SidebarIcon>
                <Styled.SidebarLabel>{label}</Styled.SidebarLabel>
            </Styled.SidebarLink>
        </li>
    );
}


interface SidebarProps {
    iconLabels: { to: string; label: string }[];
}

export default function Sidebar({ iconLabels }: SidebarProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            console.log("You are logged out");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <Styled.SidebarContainer>
            <Styled.LogoContainer>
                <Styled.LogoImage src={logo} alt="Andromeda-logo" />
                <Styled.LogoText>Andromeda</Styled.LogoText>
            </Styled.LogoContainer>
            <Styled.SidebarList>
                {iconLabels.map((iconLabel, index) => {
                    let icon: React.ReactNode;
                    switch (iconLabel.label) {
                        case "Inicio":
                            icon = <Home />;
                            break;
                        case "Grupos":
                            icon = <ViewList />;
                            break;
                        case "Estadísticas":
                            icon = <BarChart />;
                            break;
                        case "Ajustes":
                            icon = <Settings />;
                            break;
                        default:
                            icon = null;
                    }
                    return (
                        <SidebarLink
                            key={index}
                            to={iconLabel.to}
                            label={iconLabel.label}
                            icon={icon}
                        />
                    );
                })}
                <li>
                    <Styled.LogoutButton onClick={handleLogout}>
                        <ExitToApp
                            sx={{
                                paddingRight: "0.5rem",
                            }}
                        />
                        Cerrar sesión
                    </Styled.LogoutButton>
                </li>
            </Styled.SidebarList>
        </Styled.SidebarContainer>
    );
}
