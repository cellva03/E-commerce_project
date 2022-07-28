// importing all the necessary components and libraries
import Products from './Products'
import Navbar from './Navbar'
import { useState, useEffect } from 'react';


const Shop = () => {

  // declaring the state variables
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  // handling the category input
  const handleCatChange = (event) => {
    setCategory(event.target.value);
  };

  // handling the search input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // filtering the products based on the category and search input
  const FilterProducts = (products) => {
    if (category === '' && search === '') {
      return products;
    }
    else if (category === '') {
      return products.filter(product => product.title.toLowerCase().includes(search));
    } else {
      return products.filter(product => product.category.toLowerCase().includes(category));
    }
  }

  // fetching the products from the database
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  },[])


  // rendering the components
  return (
    <>
      <Navbar handleCatChange={handleCatChange} handleSearchChange={handleSearchChange} category={category}/>
      <Products items={FilterProducts(products)}/>
    </>
  )
}

export default Shop;