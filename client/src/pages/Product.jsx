// importing all the necessary components and libraries
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Navbar from "../components/Navbar";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";


const Product = () => {

  // declaring the state variables and navigation
  const navigate = useNavigate();
  const [product,setProductData] = useState([]);
  const [image, setImage] = useState('');
  const { id } = useParams();

  // Handling the add to cart button
  const handleAddToCart = () => {
    const data ={
      title : product.title,
      oldId : product._id,
      price : product.price,
      ProductImage : product.ProductImage,
      stock : product.stock,
      quantity : 1,
      description : product.description,
      category : product.category
    }
     fetch("http://localhost:3001/api/auth/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
     })
     .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.errMessage){
          alert(data.errMessage);
        }
      })

  }


  // handling the add to wishlist button
  const handleAddToWishList = () => {
    const data ={
      _id : product._id,
      title : product.title,
      price : product.price,
      ProductImage : product.ProductImage,
      stock : product.stock,
      description : product.description,
      category : product.category
    }
     fetch("http://localhost:3001/api/auth/wish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
     })
     .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.errMessage){
          alert(data.errMessage);
        }
      })
  }


  // fetching the product data from the server
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setProductData(data.product)
      if(data.product.ProductImage) {
        const buffer = data.product.ProductImage.data.data;
        const b64 = new Buffer(buffer).toString('base64');
        setImage(b64);
      }
      else{
        setImage("https://via.placeholder.com/100x100");
      }
    })
  },[])
  // console.log(product)

  // rendering the component
  return (
    <>
      <Navbar />
        <div style={{display: 'flex',flexDirection:'row',flexWrap:'wrap'}}>
          <Card sx={{ maxWidth: '400px',maxHeight:'400px',margin:'50px 0 0 50px'}}>
            <CardMedia
                component="img"
                image={`data:image/png;base64,${image}`}
                alt="Product"
              />
          </Card>
          <Container sx={{display: 'flex',flexDirection:'column',width:'600px',margin:'50px 0 0 30px'}}>
            <Typography variant="h4" component="h4">
              {product.title}
            </Typography><br/>
            <Typography  variant="h6" component="h6">
              Description:
            </Typography>
            <Typography> {product.description}
            </Typography><br/>
            <Typography variant="h6" component="h6" sx={{color:'red'}}>
                {product.price}
            </Typography>
            <br/>
            <br/>
            <Box sx={{}}>
              <Button variant="outlined" sx={{width:'auto',backgroundColor: 'transparent',border:'2px solid teal',color:'black',borderRadius:'0px',marginBottom:'50px'}} onClick={ handleAddToCart } >Add to Cart</Button>
              <Button variant="outlined" sx={{width:'auto',backgroundColor: 'transparent',border:'2px solid teal',color:'black',borderRadius:'0px',marginBottom:'50px',marginLeft:'30px'}} onClick={ handleAddToWishList } >Wish List</Button>
            </Box>
          </Container>
        </div>
    </>

  );
};

export default Product;
