// importing all the necessary components and libraries
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import SingleProduct from '../components/SingleCart';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { Card } from '@mui/material';


// styling the component
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;


// starting the component
const Cart = () => {

  // declaring the state variables and navigation
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [total , setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);


// function for handling the checkout button
const handleCheckout = (products) => {
  let cal = 0;
  let discountAmount = 0;
  let quant

  // looping through the products and calculating the total
  products.forEach(product => {
    quant = localStorage.getItem(product._id);
    const price = product.price.substring(1);
    if(quant === null){
      // console.log('not a number');
      cal += parseInt(price) * 1;
      quant = 1;
    }
    else{
      // console.log('number');
      cal += parseInt(price) * quant;
    }
    // console.log(cal);
  })
  
  // calculating the discount amount
  setTotal(cal);

  if (user.discount>0) {
    discountAmount = cal * (user.discount / 100);
    cal = cal - discountAmount;
    localStorage.setItem('discountAmount',discountAmount);
  }

  const data = {
      products: products.map(product => {
        // console.log(quant)
          return {
              productId: product._id,
              oldId : product.oldId,
              quantity: quant,
          }
      }),
      cost : cal,
  }
  // console.log(data);
  // sending the data to the server
   fetch("http://localhost:3001/api/auth/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
   })
   .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if(data.message){
        localStorage.setItem('total', cal)
        navigate("/order");
      }
    })
}

// function for handling the remove cart button
const removeCart =(id)=>{
  fetch(`http://localhost:3001/api/auth/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      localStorage.setItem('CartLen', localStorage.getItem('CartLen') - 1);
      setProducts(data.cart);
    })
}

// function for rendering the cart products
  const renderProduct = (products) => {
        if(products.length === 0 ){
          return <><br/>
            <Card sx={{ minWidth: 275,margin:'50px auto',maxWidth:'600px' }}>
              <CardContent sx={{margin: '0px auto'}}>
                <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                  Your cart is empty 😔
                </Typography>
                <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                  Go to shop and add some products to cart
                </Typography>
                <Link to="/shop" style={{textDecoration:'none'}}>
                  <Typography className='text-center' sx={{ fontSize: 18,color:'blue' }} color="text.primary" gutterBottom>
                    Go to shop
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </>
        }
        else{
          return (
            products.map((product, index) => {
              return (
                <SingleProduct product={product} key={index} removeCart={removeCart}/>
              )
            }
            )
          )
        }
  }


  // useEffect for fetching the products from the server
  useEffect(() => {
    fetch("http://localhost:3001/api/auth/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setProducts(data.cart)
        localStorage.setItem('CartLen', data.cart.length);
        setQuantity(data.cart.quantity)
        setIsLoading(false);
      });
  },[]);
  // console.log(products);

  // rendering the component
  return (
    <>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>YOUR CART</Title>
        <Bottom>
          <Info>
            {
              isLoading ? 
              <>
                <Stack alignItems="center" sx={{margin: '0 auto'}}>
                  <CircularProgress />
                </Stack>
              </>
              :
              <>
                {
                  renderProduct(products)
                }
              </>
            }
          </Info>
        </Bottom>
        {
          products.length < 1 ? <></> : <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end">
          <Button variant="contained" sx={{marginTop:'50px'}} onClick={()=> handleCheckout(products) } >Check Out</Button>
        </Box>
        }
      </Wrapper>
    </Container>
    </>
  );
};

export default Cart;
