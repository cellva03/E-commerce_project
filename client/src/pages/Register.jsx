// importing all the necessary components and libraries
import styled from "styled-components";
import { mobile } from "../responsive";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import Img from '../assets/bg.png'

//  styling the component
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
  width: 50%;
  min-width: 300px;
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
  flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #0018f9;
  color: white;
  cursor: pointer;
`;


const Register = () => {

  // declaring the state variables and navigation
  
  const { register,handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  // function for handling the login button
  const onSubmit = (data) => {
    console.log(data);
    const userData = {
      email: data.email,
      password: data.password,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.phone,
    }
    fetch('http://localhost:3001/api/auth/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.user){
          navigate("/login");
        }
        else{
          alert('User already exists');
        }
      })
  }



  // rendering the component
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="first name" type="text" {...register("firstName", { minLength:5 })}/>
          {errors.firstName && <span style={{color:'red',fontSize:'14px'}}>The FirstName Should be minimum 5 characters. </span>}
          <Input placeholder="last name" {...register("lastName", { minLength:5 })} type="text" / >
          {errors.lastName && <span style={{color:'red',fontSize:'14px'}}>The lastName Should be minimum 5 characters. </span>}
          <Input placeholder="username" {...register("username", { minLength:5 })} type='text'/>
          {errors.username && <span style={{color:'red',fontSize:'14px'}}>The username Should be minimum 5 characters. </span>}
          <Input placeholder="email" {...register("email", { minLength:8 })} type='email' />
          {errors.email && <span style={{color:'red',fontSize:'14px'}}>The email Should be minimum 8 characters. </span>}
          <Input placeholder="password" {...register("password", { minLength:8 })} type='password' />
          {errors.password && <span style={{color:'red',fontSize:'14px'}}>The Password Should be minimum 8 characters. </span>}
          <Input placeholder="phone" {...register("phone", { min:10 })} type='number' />
          {errors.mobile && <span style={{color:'red',fontSize:'14px'}}>The Mobile Number Should be minimum 10 Number</span>}
        <Button type="submit" style={{marginTop:'10px'}}>CREATE</Button><br/><br/>
        </Form>
        <Link to="/login" style={{ cursor: "pointer" }}>Already have an Account..</Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
