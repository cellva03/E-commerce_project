// Importing all the required components and packages

import Sidebar from "../../../components/sidebar/Sidebar";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const NewProduct = () => {
  // creating useState hook for the image url and the file
  const [imgfile, setFile] = useState();

  // useNavigate is used to navigate to the previous page
  const navigate = useNavigate();

  // creating a inputs row for the form
  const inputs = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'e.g. sofa',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'e.g. soft and comfortable sofa',
      required: true
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      placeholder: 'e.g. $100',
      required: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      placeholder: 'e.g. furniture',
      required: true
    },
    {
      name: 'stock',
      label: 'Stock',
      type: 'Number',
      placeholder: 'e.g. 10',
      required: true
    }
  ]  

  // creating a useForm hook for the form
  const { handleSubmit,register } = useForm();


  // Handling the form submit add a new product to the database
  const onSubmit = (data,e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('ProductImage', imgfile);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('stock', data.stock);

    axios.post('http://localhost:4001/api/products/new', formData)
    .then(res => {
      console.log(res.data.product)
      if(res.data.products){
        alert('Product added successfully')
        navigate('/product')
      }
      else{
        alert('Error adding product')
      }
  })

  }


  // Rendering the component
  return (
    <div className="new_container">
      <Sidebar/>
      <div style={{width:'100%',margin:'10px 50px 0 50px',}}>
        <Card sx={{ height: '50px',width: '100%' }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Add New Product
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{width: '100%',padding:'50px',marginTop:'10px' }}>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

          {/* Rerendering the inputs field all the add new product form */}
          {
            inputs.map((input, index) => {
              return (
                <div key={index} className="input_container">
                  <label className="new_label">{input.label}</label>
                  <input className="new_input" type={input.type} name={input.name} {...register(input.name)} placeholder={input.placeholder} required={input.required} autoComplete='off'/>
                </div>
              )
            })
          }
          <div className="input_container">
              <label className="new_label">Product Image</label>
              <input className="new_input" type="file" name="ProductImage" {...register('ProductImage')} onChange={(e)=>{setFile(e.target.files[0])}} required={true}/>
              {/* <Button variant="contained" color="primary" sx={{marginTop:'20px'}} onClick={handleUpload}>Upload</Button> */}
            </div>
          <Button variant="contained" color="primary" sx={{marginTop:'20px'}} type='submit'>Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default NewProduct