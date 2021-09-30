import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    width: 100%;
    min-width: 40px;
    height: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const animate = keyframes`
    from{
        transform: rotate(0deg);
    }to{
        transform: rotate(360deg);
    }
`;

const Loading = styled.div`
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 5px solid white;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: ${animate} 2s linear infinite;
`;


const Loader = () => (
    <Container>
        <Loading />
    </Container>
);

export default Loader;