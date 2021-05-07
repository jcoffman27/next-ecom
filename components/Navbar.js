import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import UnstyledLink from './styled/UnstyledLink'
import {IoCartOutline} from 'react-icons/io5'
import useCart from '../hooks/useCart'



const Nav = styled.nav`
  background: white;
  /* 16px is 1rem using styled normalize */
  padding: 1.25rem; 
`;

const NavContainer = styled.div`
    width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 1.75rem;
  font-weight: 725;
  display: flex;
  justify-content: space-between;

`;

const ShoppingCart = styled(IoCartOutline)`
  margin-right: 1rem;

  &:hover{
    cursor: pointer;
  }
`;
const Navbar = () => {
  const {openCart} = useCart();

  const handleClick = () => {
    openCart();
  }


  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>Coffman Art Studio</UnstyledLink>
        </Link>
        <ShoppingCart onClick={handleClick}/>
      </NavContainer>
    </Nav>

  )
}

export default Navbar