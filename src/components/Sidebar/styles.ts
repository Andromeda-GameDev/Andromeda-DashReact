import {NavLink} from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;
  background-color: white;
  height: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
`;

export const LogoImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  //margin-left: 1.3rem;
`;

export const LogoText = styled.h1`
  font-size: 1.3rem;
  color: #4f46e5;
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0; 
  margin: 0; 
  list-style-type: none;
  padding-top: 1rem;
`;

export const SidebarLink = styled(NavLink)<{ isactive: string }>`
  display: flex;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem;
  transition: transform 0.2s ease-in;
  color: ${(props) => (props.isactive === "true" ? "#000000" : "#687d9d")};
  background-color: ${(props) => (props.isactive === "true" ? "#E0E7FF" : "transparent")};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateX(0.5rem);
    color: #36495d;
  }
`;

export const SidebarIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 2rem;
  font-size: 1.5rem;
  color: #a0aec0;
  margin-right: 0.5rem;
`;

export const SidebarLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  padding-left: 5px;
`;

export const SidebarActiveIndicator = styled.span<{ isactive: string }>`
  height: 90%;
  width: 0.3rem;
  background-color: ${(props) => (props.isactive === "true" ? "#4f46e5" : "transparent")};
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  margin-top: 8rem;
  transition: transform 0.2s ease-in;
  color: #687d9d;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  
  &:hover {
    transform: translateX(0.5rem);
    color: #36495d;
  }
`;

