import fs from 'fs'
import matter from 'gray-matter'
import styled from "styled-components";
import Link from 'next/link'
import UnstyledLink from '../components/styled/UnstyledLink'
import useCart from '../hooks/useCart'
import {useContext} from 'react'
import {Context} from '../context/Cart'


const Container = styled.div`
  background: white;
  padding: 0.75rem 1.5rem;

  min-height: 10rem;
  position: relative;
  transition: transform 0.1s;

  &:hover{
    transform: scaleY(1.005);
  }
  margin-bottom: .25rem;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25rem;
  grid-row-gap: 0rem;
  margin: 0.25rem 0;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  background: #C1657D;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: white;
`;

const renderProduct = (product, addItemToCart) =>{
  
  const handleClick = (e) =>{
    e.stopPropagation();
    addItemToCart(product)
  }


  // console.log(product)

  return(

    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <h2>{product.name}</h2> 
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>

  )
}

const HomePage = (props) => {
  const { cart, addItemToCart } = useCart();
  console.log(cart)
  return (
    <ProductsContainer>
      {props.products.map(product => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  )
}

// getStaticProps is run when we build a new version of our nextJS app, and we will only see this console logs here in our terminal, not in our dev console.
export const getStaticProps = async () => {
  const directory =  `${process.cwd()}/content`
  const filenames = fs.readdirSync(directory);
  // console.log(filenames)

  const products = filenames.map(filename => {
    //read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()
    // console.log(fileContent)
    //pull out frontmatter => name
    const { data } = matter(fileContent)
    // console.log(data)
    //return product name and slug
    //coolsite.come/products/basketball-hoop
    //products/basketball-hoop is the slug
    const slug = `/products/${filename.replace('.md', '')}`
    const product = {
      ...data,
      slug: slug
    }
    // console.log(products)
    return product;
  })

  console.log(products)
  return {
    props: {
      products,
    }
  }
}

export default HomePage
