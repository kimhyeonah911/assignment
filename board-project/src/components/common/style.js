import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    overflow-y: auto;
    `;
    
export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    padding: 6px 0;
    background-color: transparent;
    color: #333;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    svg {
    font-size: 16px;
    }
`;