import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: ${props => props.$100vh ? "100vh" : "100%"};
`