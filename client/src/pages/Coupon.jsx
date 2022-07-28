// importing all the necessary components and libraries
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Coupon = () => {

  // declaring the state variables and navigation
  const [user, setUser] = useState([]);


  // fetching the user from the database
  useEffect(() => {
    fetch("http://localhost:3001/api/auth/user")
      .then(res => res.json())
      .then(data => setUser(data.user));
  },[])
  console.log(user);

  // rendering the component in conditional rendering
  return (
    <>
      <Navbar />
      {user.discount >0 ? 
      <>
        <Card style={{maxWidth:'600px',minWidth:'320px', margin: 'auto', marginTop: '10%',padding:'50px'}}>
        <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Congratulations 🎉 {user.name} You Have A Coupon
          </Typography><br/>
          <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            This coupon will be automatically apply this to your next order
          </Typography><br/>
          <Typography className='text-center' sx={{ mb: 1.5 }} color="text.secondary">
            Your Coupon Discount : {user.discount}%
          </Typography>
          <Typography className='text-center' variant="body2">
             This Coupon Will Be Valid For Next 3 Days
          </Typography><br/>
          <Typography className='text-center' variant="body2">
             Order Now And Get Your {user.discount}% Discount
          </Typography><br/>
          <Link to='/shop' style={{ textDecoration: 'none',cursor:'pointer'}}> 
            <Typography className='text-center' variant="h5">
              Shop Now
            </Typography> 
          </Link>
        </Card>
      </>
        : 
        <>
        <Card style={{maxWidth:'600px',minWidth:'320px', margin: 'auto', marginTop: '10%',padding:'50px'}}>
        <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Sorry 😓 {user.name} You Have No Coupon Right Now.
          </Typography><br/>
          <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Don't Worry You will get a Discount Soon !
          </Typography><br/>
          <Link to='/shop' style={{ textDecoration: 'none',cursor:'pointer'}}> 
            <Typography className='text-center' variant="h5">
              Shop Now
            </Typography> 
          </Link>
        </Card>
        </>
        }
    </>
  )
}

export default Coupon