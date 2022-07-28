// Importing all the required components and packages
import Sidebar from "../../../components/sidebar/Sidebar";
import './single.css';
import { useForm } from "react-hook-form";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect,useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams,useNavigate } from "react-router-dom";


const SingleUser = () => {

  // creating a useNavigate hook for the EditUser page
  const navigate = useNavigate();

  // creating useState hook for user data and the loading state
  const [user, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Creating a react hook forms
  const { handleSubmit,register } = useForm();

  // handleSubmit to submit the form
  const onSubmit = (data) => {
    // console.log(data)
    fetch(`http://localhost:4001/api/users/update/${id}`, {
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
        // if the user is updated successfully, navigate to the user list page
        alert('User Updated Successfully')
        navigate('/user')
      }
      else{
        // if the user is not updated successfully, alert the admin
        alert('User Not Updated Successfully')
      }
    })
  }

  // fetching the user data from the server
  useEffect(() => {
    fetch(`http://localhost:4001/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data.user);
      setUserData(data.user);
      setLoading(false);
    })
  }, []) 

  // if the loading state is true, show the loading spinner else render the page
  return (
    <div className="single_container">
      <Sidebar/>
      {
        loading ? <CircularProgress style={{margin: '200px 300px'}}/> : <div style={{width:'100%',margin:'10px 50px 0 50px'}}>
        <Card sx={{ height: '50px',width: '100%' }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Edit User
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{width: '100%',padding:'50px',marginTop:'10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_container">
            <label className="new_label">User Name</label>
            <input className="new_input" type='text' name='username' defaultValue={user.username} {...register("username")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">First Name</label>
            <input className="new_input" type='text' name='firstname' defaultValue={user.firstName} {...register("firstName")} autoComplete='off'/>
            <label className="new_label">Last Name</label>
            <input className="new_input" type='text' name='lastname' defaultValue={user.lastName} {...register("lastName")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Email</label>
            <input className="new_input" type='email' name='email' defaultValue={user.email} {...register("email")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Mobile</label>
            <input className="new_input" type='number' name='mobile' defaultValue={user.mobile} {...register("mobile")} autoComplete='off'/>
          </div>
          <div className="input_container">
            <label className="new_label">Password</label>
            <input className="new_input" type='password' name='password' defaultValue={user.password} {...register("password")} autoComplete='off'/>
          </div>
          <Button variant="contained" color="primary" sx={{marginTop:'20px'}} type='submit'>Submit</Button>
          </form>
        </Card>
      </div>
  
      }
    </div>
  )
}

export default SingleUser