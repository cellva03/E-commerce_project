  // creating useState hook for user data and the loading state
import DataTable from "../../../components/datatable/DataTable"
import Sidebar from "../../../components/sidebar/Sidebar"
import jwt_decode from "jwt-decode";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './userlist.css'

// render the UserList page
const UserList = () => {
  const navigate = useNavigate();

  const verifyUser = async()=>{
    const res = await fetch('http://localhost:4001/api/auth/populate',{
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    const data = await res.json();
    if(!data.user){
      navigate('/');
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token)
      if(user){
        verifyUser();
      }
      else{ 
        localStorage.removeItem('token');
        navigate('/');
      }
    }
    else{
      // if token is not present redirect to login
      navigate('/');
    }

  }, []);
  
  return (
    <div className="user_list_container">
      <Sidebar/>
      <DataTable className='user_table' />
    </div>
  )
}

export default UserList