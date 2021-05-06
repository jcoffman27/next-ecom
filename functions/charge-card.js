const fs = require('fs');
const matter = require('gray-matter')

const getProducts = () => {
  const directory =  `${process.cwd()}/content`
  const filenames = fs.readdirSync(directory);

  const products = filenames.map(filename => {
    
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()

    const { data } = matter(fileContent)

    return data;
  })
  return products;
}

// process.env.STRIPE_PUBLIC_KEY
// process.env.STRIPE_SECRET_KEY


exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  const products = getProducts();

  const cartWithProducts = cart.map(({id, qty}) => {
    const product = products.find(p => p.id === id);
    return{
      ...product,
      qty,
    }
  })
  console.log(cartWithProducts)
  
  //Talking to Stripe

  //Charging the card

  //What we send back as a response
  return{
    statusCode: 200,
    body: "Payment Successful!"
  }
}