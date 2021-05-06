import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import Navbar from '../components/Navbar'
import CartProvider from "../context/Cart"
import Cart from '../components/Cart'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
  
  font-family: 'Raleway', sans-serif;

  background: linear-gradient(to right, #F4E2D8, #BA5370);

  color: #844;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({Component, pageProps}) => {
  return(

    <CartProvider>
      <Container>
        <Normalize />
        <Navbar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
      </Container>
    </CartProvider>
    
  );
};

export default MyApp

//This component will wrap any page level component that we create, it will be rendered on every page in our pages directory
//The white flash when we click on the link is because we make a fresh request to the server every time, we need to switch this to the client side by utilizing the <Link> component