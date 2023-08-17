'use client'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

function Navbar() {
  return (
    <Container>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: ${props => props.theme.colors.light_shade};
  border-radius: 30px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 600;
    &:hover {
      color: ${props => props.theme.colors.primary_dark};
    }
  }
  &:disabled {
    display: none;
  }
`