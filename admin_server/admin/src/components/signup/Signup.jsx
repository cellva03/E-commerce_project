// Importing all necessary components and libraries
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Img from '../../assets/login.jpg';
import {useNavigate} from 'react-router-dom';

// create a theme instance for the Login page
const theme = createTheme();

export default function SignUpSide() {

  // create a navigate hook for the Login page
  const navigate = useNavigate();
  const { register,handleSubmit,formState: { errors } } = useForm();
  
  // Creating a fuction to handle the signup button
  const onSubmit = (data) => {
    console.log(data);
    fetch('http://localhost:4001/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.err){
        // if there is an error, display it
        alert(data.err);
      }
      else{
        // if there is no error, set the token and redirect to the login page
        console.log(data);
        navigate('/');
      }
    })
  };

  // Rendering the Login page with the necessary components
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Register Here...
            </Typography><br/><br/>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            {/* Rendering all the form field for signup page */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1,width:'80%' }}>
                <TextField
                margin="normal"
                required
                fullWidth
                label="User Name"
                autoFocus
                {...register("username",{ minLength: 5 })}
                 />
                 {errors.username && <span style={{color:'red',fontSize:'12px'}}>UserName Length should be at least 5 Characters. </span>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                {...register("email",{  minLength: 8 })}
              />
              {errors.email && <span style={{color:'red',fontSize:'12px'}}>Email Length should be at least 8 Characters. </span>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register("password",{  minLength: 8 })}
              />
              {errors.password && <span style={{color:'red',fontSize:'12px'}}>Password Length should be at least 8 Characters. </span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  {/* Redirect to login page */}
                  <Link href="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}