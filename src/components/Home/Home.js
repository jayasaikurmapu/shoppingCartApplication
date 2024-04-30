import React from 'react'
import Sample from "./Sample";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import '../styles/Home.css';

export default function Home({ cardData }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const product = cardData.map((item) => (
    <Sample
      key={item.productsid}
      name={item.productname}
      url={item.productimgurl}
      price={item.productprice}
      description={item.productdesc}
      id={item.productsid}
      stock={item.stockavailable}
      category={item.category}
    />
  ));
  return (
    <div>
      <div className='background' style={{width: '100vw'}}>
        <h4 className='newCollectionHeading'>NEW COLLECTION</h4>
        <h1 className='capstoneStoreHeading'>CAPSTONE STORE</h1>
        <div className='content'>
          <p>Welcome to our capstone store,
            your one-stop destination for all your
            shopping needs. Explore our extensive
            collection featuring a diverse range of
            products, from home appliances to
            electronic gadgets, toys, games, fashion,
            and more. With something for everyone, we
            aim to provide a seamless shopping
            experience tailored to your preferences.
          </p>
        </div>
        <Link to='./cardGrid'>
          <Button
          style={{marginLeft: 40,marginTop: 20, fontFamily: 'robotoRegular'}}
          className='buttonStyle'>
            SHOP NOW
          </Button>
        </Link>

      </div>

      <div className='carouselBackground' style={{width: '100vw', height: '100vh'}}>
        <h1 className='ourCollectionHeading'>Our Collection</h1>
        <Carousel
          showDots={true}
          responsive={responsive}
          data-testid="carousel"
        >
          {product}
        </Carousel>
      </div>
    </div>
  )
}
