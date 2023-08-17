import styled from 'styled-components'

export const Container = styled.div`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    z-index: 101;
    display: block;
    margin: 0 auto;
    flex-direction: column;
    margin: 0 auto;
`
export const Header = styled.h1`
    max-width: 350px;
    align-self: center;
    margin: 0 auto;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
`