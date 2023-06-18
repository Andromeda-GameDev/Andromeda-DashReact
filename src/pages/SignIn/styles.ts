import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    height: 100vh;
    width: 100%;
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;


export const HiddenBlock = styled.div`
    display: none;
    @media (min-width: 640px) {
        display: block;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;


export const MainContent = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8rem;
    margin-bottom: 8rem;
    padding: 2rem;
`;


export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    label {
        padding-top: 0.5rem;
        font-weight: 500;
    }
    input {
        border: 1px solid gray;
        padding: 0.75rem;
    }
`;

export const Button = styled.button`
    border: 1px solid blue;
    background: blue;
    color: white;
    padding: 0.5rem 1.5rem;
    margin-top: 1rem;
`;

export const Error = styled.div<{ visible: string | null }>`
    background: red;
    color: white;
    border: 1px solid darkred;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.25rem;
    width: 100%;
    height: 5rem;
    overflow: auto;
    word-wrap: break-word;
    visibility: hidden;
    ${props =>
        props.visible &&
        css`
            visibility: visible;
        `}
`;
