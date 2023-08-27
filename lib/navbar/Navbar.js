'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import home from '@/public/home.svg'
import watchlist from '@/public/watchlist.svg'
import profile from '@/public/profile.svg'

function Navbar() {
  return (
    <Container>
      <Link href="/">
        <Image height={30} width={30} src={home} alt="home" />
      </Link>
      <Link href="/watchlist">
        <Image height={30} width={30} src={watchlist} alt="watchlist" />
      </Link>
      <Link href="/profile">
        <Image height={30} width={30} src={profile} alt="profile" />
      </Link>
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
  background-color: ${props => props.theme.colors.pallet.neutral[100]};
  border-radius: 30px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.pallet.primary};
    font-size: 1.5rem;
    font-weight: 600;
    &:hover {
      color: ${props => props.theme.colors.pallet.primary};
    }
  }
  &:disabled {
    display: none;
  }
`