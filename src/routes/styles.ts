import styled from "styled-components";

export const ProfessorRouterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StudentRouterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  width: 190px; 
  height: 100%;
  z-index: 2;
`;

export const ContentContainer = styled.div`
  flex: 1;
  margin-left: 190px; 
`;
