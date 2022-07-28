// Importing all the required components and packages
import Sidebar from "../../../components/sidebar/Sidebar";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect,useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,useNavigate } from "react-router-dom";

const SingleProduct = () => {

  // creating useState hook for the image url , the file, product data and the loading state
  const [file, setFile] = useState();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Creating a react hook forms
  const { handleSubmit,register } = useForm();

  // useNavigate to create a navigate function
  const navigate = useNavigate();

  // Handle the form submit
  const onSubmit = (data,e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('ProductImage', file);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('stock', data.stock);

    axios.post(`http://localhost:4001/api/products/update/${id}`, formData)
    .then(res => {
      console.log(res.data.product)
      if(res.data.products){
        alert('Product Updated successfully')
        navigate('/product')
      }
      else{
        alert('Error adding product')
      }
  })
  }

  // Fetching the product data from the database using useEffect
  useEffect(() => {
    fetch(`http://localhost:4001/api/products/${id}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data.product);
      setProduct(data.product);

      setLoading(false);
    })
  }, []) 

  // Rendering the component
  return (
    <div className="single_container">
      <Sidebar/>
      {
        loading ? <CircularProgress style={{margin: '200px 300px'}}/> : <div style={{width:'100%',margin:'10px 50px 0 50px'}}>
        <Card sx={{ height: '50px',width: '100%' }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Update the Product
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{width: '100%',padding:'50px',marginTop:'10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_container">
            <label className="new_label">Title</label>
            <input className="new_input" type='text' name='title' defaultValue={product.title} {...register("title")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Description</label>
            <input className="new_input" type='text' name='description' defaultValue={product.description} {...register("description")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Price</label>
            <input className="new_input" type='text' name='price' defaultValue={product.price} {...register("price")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Category</label>
            <input className="new_input" type='text' name='category' defaultValue={product.category} {...register("category")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Stock</label>
            <input className="new_input" type='number' name='stock' defaultValue={product.stock} {...register("stock")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">ProductImage</label>
            <input className="new_input" type='file' name='ProductImage' {...register("ProductImage")} autoComplete='off' onChange={(e)=>{setFile(e.currentTarget.files[0])}}/>
          </div>
          <Button variant="contained" color="primary" sx={{marginTop:'20px'}} type='submit'>Submit</Button>
          </form>
        </Card>
      </div>
  
      }
    </div>
  )
}

export default SingleProduct