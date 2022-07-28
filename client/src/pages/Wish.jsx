// importing all the necessary components and libraries
import Button from '@mui/material/Button';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate,Link } from 'react-router-dom';
import { useState,useEffect } from "react";


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


const Wish = () => {

  // declaring the state variables and navigation
  const navigate = useNavigate();
  const [total , setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // function for handling the remove from wishlist button
  const removeWish =(id)=>{
    fetch(`http://localhost:3001/api/auth/wish/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      localStorage.setItem('WishLen', localStorage.getItem('WishLen') - 1);
        setProducts(data.wish);
      })
  }

  // rendering the image from base64
  const renderImage = (image) => {
    const buffer = image.data.data;
    const b64 = new Buffer(buffer).toString('base64');
    return `data:image/png;base64,${b64}`;
}

// rendering the products in wishlist using conditional rendering
const renderProduct = (products) => {
  if(products.length === 0 ){
    return <><br/>
      <Card sx={{ minWidth: 275,margin:'50px auto',maxWidth:'600px' }}>
        <CardContent sx={{margin: '0px auto'}}>
          <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Your WishList is empty 😔
          </Typography>
          <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Go to shop and add some products to your wishlist
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
          <Card sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:'30px', }} key={index}>
              <CardMedia
                  component="img"
                  alt="green iguana"
                  image={renderImage(product.ProductImage)}
              />                
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                  {product.title}
                  </Typography><br/>
                  <Typography sx={{color:'red'}} variant="h6">
                  {product.price}
                  </Typography>
                  <br/>
                  <Button variant="contained" sx={{backgroundColor:'red'}} onClick={()=>removeWish(product._id)}>Remove</Button>
                  <Button variant="contained" sx={{marginLeft:'20px'}} onClick={()=>navigate(`/products/${product._id}`)}>View</Button>
              </CardContent>
          </Card>
        )
      }
      )
    )
  }
}

  // fetching the products from the database
  useEffect(() => {
    fetch("http://localhost:3001/api/auth/wish")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
       localStorage.setItem('CartLen', data.wish.length);
        setProducts(data.wish)
        setIsLoading(false);
      });
  },[]);


  // rendering the component
  return (
    <>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>YOUR WISHLIST</Title>
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
      </Wrapper>
    </Container>
    </>
  );
};

export default Wish;
