// importing all the necessary components and libraries
import Carousel from 'react-bootstrap/Carousel'
import React, { useState } from 'react';
import { sliderItems } from '../data.js';



const Slider = () => {

  // declaring the state variables
  const [index, setIndex] = useState(0);

  // handling the carousel
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // rendering the components
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {sliderItems.map((item, i) => {
        return (
          <Carousel.Item key={i} style={{height: '500px'}}>
            <img
              className="d-block w-100"
              style={{height: '500px',filter: 'brightness(0.4)'}}
              src={item.img}
              alt='image'
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  )
}

export default Slider