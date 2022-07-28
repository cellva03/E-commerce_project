// Importing all necessary components and libraries

import React, {useEffect,useState} from 'react'
import './home.css'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Img from '../../assets/home card.png'


const Home = () => {

  const [toggle, setToggle] = useState(false);

  const handleToggleSidebar =()=>{
    setToggle(true);
  }
  // create a navigate hook for the Home page
  const navigate = useNavigate();

  // verify the token and get render dashboard if not redirect to login
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
  
  // UseEffect to verify the token
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
  },[]);

  // render the Home page
  return (
    <div className='home_container'>
      <Sidebar/>
        {/* <div className="btn_toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div> */}
      <div style={{height:'100vh',width:'100%'}}>
        <img src={Img} alt='Dashboard Home' width='100%' height='100%'/>
      </div>
    </div> 
  )
}

export default Home;