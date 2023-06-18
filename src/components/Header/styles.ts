import styled from 'styled-components';

export const HeaderPanel = styled.header`
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 30;
    //box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
`;

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5.6rem;
    padding: 0 1.5rem; 
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;

    h1 {
        font-size: 1rem; 
        font-weight: 600; 
    }
`;

export const DateContainer = styled.div`
    margin-left: auto;
    flex-shrink: 0;

    span {
        display: inline-flex;
        font-size: 1rem; 
    }
`;
