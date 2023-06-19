import styled, { css } from "styled-components";

// export const ContentContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(1, 1fr);
//     height: 100vh;
//     width: 100%;
//     @media (min-width: 640px) {
//         grid-template-columns: repeat(2, 1fr);
//     }
// `;

export const ContentContainer = styled.div`
    background-color: #f5f5f5;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 640px) {
        flex-direction: row;
    }
`;