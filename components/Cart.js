import styled from 'styled-components'
import {IoCloseSharp} from 'react-icons/io5'
import useCart from '../hooks/useCart'
import {useRouter} from 'next/router'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: white;
  width: 20rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  

  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.15s ease-in;
`;

const X = styled(IoCloseSharp)`
  font-size: 2rem;

  &:hover{
    cursor: pointer;
  }
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  border-bottom: 0.1rem solid #efafaf;
`;


const Ul = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1rem solid #efafaf;
  margin-bottom: 1rem;
`;



const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.25rem;
`;

const Button = styled.button`
  background: linear-gradient(to right, #F4E2D8, #BA5370);
  font-size: 1.75rem;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;

  &:hover{
    cursor: pointer;
  }
`;



const Cart = () => {

  const { cart, isOpen, openCart, closeCart, total } = useCart();
  const route = useRouter();

  const handleClick = () => {
    closeCart();
  }

  const navigateToCheckout = () => {
    closeCart();
    route.push('/checkout')
  }


  return(
    <Container isOpen={isOpen}>
      <XContainer>
        <X onClick={handleClick}/>
      </XContainer>
      <Content>
        <Title>Cart</Title>
        {cart.length > 0 ? (
        <>
          <Ul>
            {cart.map(item => {
              return(
                  <Item>
                    <span>{item.qty}x {item.name}</span>
                    <span>${item.price / 100}</span>
                  </Item>
              )
            })}
          </Ul>
          <Total>
            <span>Total</span>
            <span>${total / 100}</span>
          </Total>
          <Button onClick={navigateToCheckout}>Checkout</Button>
        </>
        ) : (
          <p>Your cart is empty!</p>
        )}
       
      </Content>
    </Container>
  )
}

export default Cart;