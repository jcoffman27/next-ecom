
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const products = require('./products.json')



// process.env.STRIPE_PUBLIC_KEY
// process.env.STRIPE_SECRET_KEY


exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  const cartWithProducts = cart.map(({id, qty}) => {
    const product = products.find(p => p.id === id);
    return{
      ...product,
      qty,
    }
  })
  console.log(cartWithProducts)
  
  //Talking to Stripe
  const lineItems = cartWithProducts.map((product) => ({
    price_data: {
      currency: "usd",
      product_data:{
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL}/success`,
    cancel_url:  `${process.env.URL}/cancelled`,
  });

  //Charging the card

  //What we send back as a response
  return{
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  }
}