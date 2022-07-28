// importing all the necessary components and libraries
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const SingleCart = ({product,removeCart}) => {
    
    // console.log(quantity)
    // function for rendering base64 image
      const renderImage = (image) => {
        const buffer = image.data.data;
        const b64 = new Buffer(buffer).toString('base64');
        return `data:image/png;base64,${b64}`;
    }

    // rendering the component
  return (
    <>
        <Card sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:'30px' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                image={renderImage(product.ProductImage)}
            />                
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{color:'black'}}>
                {product.title}
                </Typography><br/>
                <Container>
                    <input type='number' id='quantity' min={1} style={{width:'40px',padding:'3px',margin:'0 3px'}} className='quantity_input' defaultValue={1} onChange={ ()=>{localStorage.setItem(product._id, document.getElementById("quantity").value)}}/>
                </Container><br/>
                <Typography sx={{color:'red'}} variant="h6">
                {product.price}
                </Typography>
                <Button variant="contained" onClick={()=>removeCart(product._id)}>Remove Cart</Button>
            </CardContent>
        </Card>
    </>
  )
}

export default SingleCart