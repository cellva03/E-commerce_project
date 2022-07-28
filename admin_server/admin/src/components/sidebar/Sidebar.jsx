// Importing all necessary components and libraries
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';
import { MdLocalOffer } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { SiInstacart } from "react-icons/si";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaFileUpload } from "react-icons/fa";
import { useEffect, useState } from 'react';



const Sidebar = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [collapsed, setCollapsed] = useState(false);

    // create a navigate hook for the Sidebar page
    const navigate = useNavigate();
    // const [toggle, setToggle] = useState(false);

    //handle the logout function and redirect to the login page when the logout button is clicked and remove the token from the local storage
    const handleLogout =()=>{
    localStorage.clear();
    navigate('/');
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        if (width < 768) {
            setCollapsed(true)
        }
        else {
            setCollapsed( false )
        }
    }, [width]);
    // console.log(collapsed,width);

    // Rendering the Sidebar page with the necessary components
  return (
    <>
        <ProSidebar  style={{height: "100vh"}} collapsed={collapsed}>
            <Menu iconShape="square">
                <MenuItem>
                    <AiFillDashboard style={{fontSize: '20px',marginRight:'10px'}}/>Dashboard <Link to='/home' />
                </MenuItem><hr/>
                <MenuItem className='menu_item'>
                    <FaUser style={{fontSize: '20px',marginRight:'10px'}}/>Users <Link to='/user' />
                </MenuItem><br />
                <MenuItem className='menu_item'>
                    <SiInstacart style={{fontSize: '20px',marginRight:'10px'}}/>Products <Link to='/product' />
                </MenuItem><br />
                <MenuItem className='menu_item'>
                    <FaFileUpload style={{fontSize: '20px',marginRight:'10px'}}/>BulkUpload <Link to='/bulk' />
                </MenuItem><br/>
                <MenuItem className='menu_item'>
                    <MdLocalOffer style={{fontSize: '20px',marginRight:'10px'}}/>Discount<Link to='/discount' />
                </MenuItem><br/>
                <MenuItem className='menu_item'>
                    <BsGraphUp style={{fontSize: '20px',marginRight:'10px'}}/>Sales<Link to='/sales' />
                </MenuItem>
                <br /><br/><hr/>
                <MenuItem className='menu_item' onClick={handleLogout}>
                    <RiLogoutBoxFill style={{fontSize: '20px',marginRight:'10px'}}/>Logout
                </MenuItem><br /><br/>
            </Menu>
        </ProSidebar>
    </>
  )
}

export default Sidebar