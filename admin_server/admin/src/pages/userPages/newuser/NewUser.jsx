// Importing all the required components and packages
import Sidebar from "../../../components/sidebar/Sidebar";
import { useForm } from "react-hook-form";
import './new.css'
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NewUser = () => {
  // creating a useNavigate hook for the NewUser page
  const navigate = useNavigate();

  // creating a inputs object  to dynamically create inputs fields
  const inputs = [
    {
      name: 'username',
      label: 'User Name',
      type: 'text',
      placeholder: 'User Name...',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email ...',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password...',
      required: true
    },
    {
      name: 'mobile',
      label: 'Mobile',
      type: 'number',
      placeholder: 'Mobile Number...',
      required: true
    }
  ]

  // creating a useForm hook for the form
  const { handleSubmit,register } = useForm();

  // Handle Submit function for the form
  const onSubmit = (data) => {
    fetch('http://localhost:4001/api/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.users){
        // navigate to the userList page if the user is created
        alert('User Created Successfully')
        navigate('/user')
      }
      else{
        alert('User Not Created Successfully')
      }
    })
  }

  // return the JSX for the NewUser page
  return (
    <div className="new_container">
      <Sidebar/>
      <div style={{width:'100%',margin:'10px 50px 0 50px'}}>
        <Card sx={{ height: '50px',width: '100%' }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Add New User
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{width: '100%',padding:'50px',marginTop:'10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_container">
            <label className="new_label">First Name</label>
            <input className="new_input" type='text' name='firstName' placeholder="first name" {...register("firstName")} autoComplete='off'/>
            <label className="new_label">Last Name</label>
            <input className="new_input" type='text' name='lastName' placeholder="last name" {...register("lastName")} autoComplete='off'/>
          </div>
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
          <Button variant="contained" color="primary" sx={{marginTop:'20px'}} type='submit'>Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default NewUser