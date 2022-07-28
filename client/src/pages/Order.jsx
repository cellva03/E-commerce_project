// importing all the necessary components and libraries
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useNavigate} from 'react-router-dom'
  

const Order = () => {

  // declaring the state variables and navigation
    const navigate = useNavigate();
    // console.log(localStorage.getItem('total'))

    // Handling the  cart button
    const handleClick = () => {
        navigate('/cart');
    }

    // returning the component by conditionally rendering the components
  return (
    <>
    <Card sx={{ minWidth: 275,width: '400px',margin:'50px auto' }}>
        <CardContent sx={{margin: '0px auto'}}>
          <Typography className='text-center' sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Your Order Done Successfully
          </Typography>
          {
            localStorage.getItem('discountAmount') ? 
            <>
              <Typography className='text-center' sx={{ mb: 1.5 }} color="text.secondary">
                Total Price Cost : $ {parseInt(localStorage.getItem('total'))+parseInt(localStorage.getItem('discountAmount'))}
              </Typography> 
              <Typography className='text-center' color='text.secondary'>
                Your Coupon Discount : ${parseInt(localStorage.getItem('discountAmount'))}
              </Typography>
              <br/>
            </>
            :
            <></>
          }
          <Typography className='text-center' sx={{ mb: 1.5 }} color="text.secondary">
            Price Cost : $ {parseInt(localStorage.getItem('total'))}
          </Typography><br/>
          <Typography className='text-center' variant="body2">
            Thank you for your order.
          </Typography>
          <Typography className='text-center' variant="body2">
            <CheckCircleIcon  sx={{color: 'green'}}/>
          </Typography>
        </CardContent>
        <CardActions className='text-center'>
          <Button size="small" onClick={handleClick}>Cart</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default Order