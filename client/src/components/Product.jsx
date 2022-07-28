// importing all the necessary components and libraries
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";


// styling the component
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  max-width: 400px;
  min-width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;



// rendering the component
const Product = ({ item }) => {

  // using the useNavigate hook to navigate to the product page
  const navigate = useNavigate();

// function for rendering base64 image
  const renderImage = () => {
      const buffer = item.ProductImage.data.data;
      const b64 = new Buffer(buffer).toString('base64');
      return `data:image/png;base64,${b64}`;
  }

  // implementation of onClick function
  const handleOnclick = () => {
    // console.log(item);
    navigate(`/products/${item._id}`);
  }


  // Rendering the component
  return (
    <Container onClick={handleOnclick} style={{cursor: 'pointer'}}>
      <Circle />
      {
        item.ProductImage ? <Image src={renderImage(item.ProductImage)} alt='Product'/> : 
        <Image src="https://via.placeholder.com/100x100" alt='Product'/>
      }
    </Container>
  );
};

export default Product;
