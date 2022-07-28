// Importing all the required components and packages
import DataTable from "../../../components/datatable/ProductDataTable"
import Sidebar from "../../../components/sidebar/Sidebar";
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// render the ProductList page
const ProductList = () => {
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

export default ProductList