// importing all the necessary components and libraries
import styled from "styled-components";
import {mobile} from "../responsive";
import {Link,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import Img from '../assets/bg.png'

// styling the component
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${Img});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #0018f9;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {

  // declaring the state variables and navigation
  const { register,handleSubmit, formState: { errors } } = useForm();
  // console.log(errors);
  const navigate = useNavigate();

  // function for handling the login button
  const onSubmit = (data) => {
    console.log(data);
    const userData = {
      email: data.email,
      password: data.password,
    }
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("logged", data.loggedIn);
        if(data.loggedIn){
          navigate("/");
        }
        else{
          alert(data.message);
        }
      })
  }

  // rendering the component
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="email" type={"email"} {...register("email", { minLength:8 })} />
          {errors.email && <span style={{color:'red',fontSize:'14px'}}>The email Should be minimum 8 characters. </span>}
          <Input placeholder="password" type={"password"} {...register("password", { minLength:8 })}/>
          {errors.password && <span style={{color:'red',fontSize:'14px'}}>The Password Should be minimum 8 characters. </span>}
          <Button>LOGIN</Button>
          <Link to="/register" style={{cursor: 'pointer'}}>Don't have an account...</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
