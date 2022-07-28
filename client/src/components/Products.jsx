// importing all the necessary components and libraries
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import Product from "./Product";
import Stack from "@mui/material/Stack";
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;


// start of the component and rendering the products
const Products = ({items}) => {
  // console.log(items)
  return (
    <Container>
      {
        items.length === 0 ? 
        <>
          <Stack alignItems="center" sx={{margin: '0 auto'}}>
            <CircularProgress />
          </Stack>
        </> 
        : items.map((item, index) => {
          return <Product key={index} item={item} />
        })
      }
    </Container>
  );
};

export default Products;
