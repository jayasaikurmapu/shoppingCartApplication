import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import '../styles/About.css';

export default function About() {
  return (
    <div class="aboutContainer">
      <h1 class="aboutTitle">About Us</h1>
      <p class="aboutText">
        At Capstone Store, we're more than just an online shopping destination – we're
        your go-to marketplace for all your needs. With a diverse range of products
        including home appliances, fashion, food and beverages, electronics, toys, and
        games, we're here to cater to every aspect of your lifestyle. Our mission is
        simple: to provide you with a seamless shopping experience, offering quality
        products at competitive prices. Founded with a passion for innovation and
        customer satisfaction, we strive to exceed your expectations every step of
        the way. Whether you're upgrading your kitchen appliances, refreshing your
        wardrobe, or finding the perfect gift, Capstone Store has you covered. Our
        commitment to excellence extends beyond our products – it's in our dedication
        to outstanding customer service and our promise to make shopping with us a
        breeze. Welcome to Capstone Store, where convenience meets quality.
      </p>
      <Link to='./cardGrid'>
        <Button
          className='aboutButton'>
          SHOP NOW
        </Button>
      </Link>
    </div>

  );
}

<Link to='./cardGrid'>
  <Button
    className='aboutButton'>
    SHOP NOW
  </Button>
</Link>
