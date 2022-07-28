// importing all the necessary components and libraries
import * as React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AppBar from '@mui/material/AppBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, alpha } from '@mui/material/styles';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState,useEffect } from 'react';


// defining the styles for the Navbar component
const drawerWidth = 240;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


//main Functional Component

function DrawerAppBar(props) {


  // defining the state for the Navbar component and the useEffect hook and the useNavigate hook
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // function to handle the drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function to handle the logout button

  const handleLogout = () => {
    fetch('http://localhost:3001/api/auth/logout')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }


  // UseEffect to check if user is logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })
   
  // rendering the drawer components
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/" style={{ textDecoration:'none'}}>Shop4Home</Link>
      </Typography>
      <Divider />
      {
        !isLoggedIn ? 
        <>
          <List>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Login' onClick={()=>{navigate('/login')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Register' onClick={()=>{navigate('/Register')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary='Cart' onClick={()=>{navigate('/login')}}/>
              </ListItemButton>
            </ListItem>
          </List>
        </>
        :
        <>
          <List>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <StorefrontIcon/><ListItemText primary='Shop' onClick={()=>{navigate('/shop')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ShoppingCartIcon/> <ListItemText primary='Cart' onClick={()=>{navigate('/cart')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <FavoriteIcon/> <ListItemText primary='WishList' onClick={()=>{navigate('/wish')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <LocalOfferIcon/> <ListItemText primary='Coupon' onClick={()=>{navigate('/coupon')}}/>
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <LogoutIcon/> <ListItemText primary='Logout' onClick={()=>{navigate('/')}}/>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      }
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
    

  // rendering the Navbar components
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {xs:'none',sm:'block', md:'block' } }}
          >
            <Link to="/" style={{textDecoration:'none' ,color:'white'}}>Shop4Home</Link>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={props.handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <FormControl sx={{ m: 1, minWidth: 110 }} size="small">
            <InputLabel id="demo-select-small">Category</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              defaultValue=""
              value={props.category}
              label="Category"
              onChange={props.handleCatChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="decor">Decor</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
            </Select>
          </FormControl>
          {
            isLoggedIn ?
            <>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Button  sx={{ color: '#fff' }}>
                  <ShoppingCartIcon/><Link to="/cart" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>Cart</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                <FavoriteIcon/><Link to="/wish" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>WishList</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <StorefrontIcon/><Link to="/shop" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>Shop</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <LocalOfferIcon/><Link to="/coupon" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>Coupon</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <LogoutIcon/><Link to="/" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}} onClick={handleLogout}>Logout</Link>
                </Button>
              </Box>
            </>
            : 
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button  sx={{ color: '#fff' }}>
                  <Link to="/login" style={{color: 'white',textDecoration: 'none',cursor: 'pointer'}}>Login</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <Link to="/register" style={{color: 'white',textDecoration: 'none',cursor: 'pointer'}}>Register</Link>
                </Button>
                <Button  sx={{ color: '#fff' }}>
                  <ShoppingCartIcon/><Link to="/login" style={{color: 'white',textDecoration: 'none',cursor: 'pointer',fontSize:'12px'}}>Cart</Link>
                </Button>
              </Box>
            </>
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;