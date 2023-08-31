import Link from 'next/link'
import styled from 'styled-components'

export const Header1 = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.textDark};
    margin: 0;
    padding: 0;
    text-align: center;
`
export const Header2 = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.textDark};
    margin: 0;
    padding: 0;
    text-align: center;
`
export const Header3 = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.textDark};
    margin: 0;
    padding: 0;
    text-align: center;
`

export const Header1Link = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    color: ${props => props.theme.colors.pallet.neutral[1000]};
    font-weight: bold;
`