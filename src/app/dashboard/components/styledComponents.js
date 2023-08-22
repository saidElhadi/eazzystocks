import styled from "styled-components";

export const Container = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
`;
