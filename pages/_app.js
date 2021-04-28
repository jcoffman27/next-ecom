import Link from "next/link"

const MyApp = ({Component, pageProps}) => {
  return(
    <>
      <Link href="/">
        <a >Home</a>
      </Link>
      <Link href="/about">
        <a >About</a>
      </Link>
      <Component {...pageProps} />
      <footer>
      Jacob Coffman's Footer
      </footer>
    </>
  );
};

export default MyApp

//This component will wrap any page level component that we create, it will be rendered on every page in our pages directory
//The white flash when we click on the link is because we make a fresh request to the server every time, we need to switch this to the client side by utilizing the <Link> component