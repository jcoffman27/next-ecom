import Page from '../components/styled/Page'
import useCart from '../hooks/useCart'
import styled from 'styled-components'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'

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

const Checkout = () => {
  const {cart, total} = useCart();

  const processPayment = async () => {
    const url = '/.netlify/functions/charge-card';
    const newCart = cart.map(({id, qty}) => ({
      id,
      qty,
    }))

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const {data} = await axios.post(url, { cart: newCart })

    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return(
    <Page>
      <h2>Checkout</h2>
      {
        cart.length > 0 ? 
        (<>
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
        <Button onClick={processPayment}>Process Payment</Button>
      </>
       ) : 
        (<p>You do not have any items in your cart!</p>)
      }
      
    </Page>
  )
}

export default Checkout;