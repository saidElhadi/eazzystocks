'use client'
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme.colors.background};
    display: flex;
    flex-direction: column;
`

