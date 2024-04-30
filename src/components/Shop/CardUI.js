import React, { useState, useEffect } from 'react';
import '../styles/Card.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarIcon from '@mui/icons-material/Star';
import { successToast } from '../toastHelper';

const CardUI = ({ productimgurl, product, numOfCart, setNumOfCart, productname, productprice, stockavailable, id, category, rating, adminRender, vendorRender }) => {

    const addToCart = (card) => {
      {
        !(adminRender || vendorRender) && (
          setNumOfCart(numOfCart + 1)
        )
      }
      axios.post('http://localhost:8080/cart/save', card)
        .then(response => {
          console.log(response.data);
          console.log('Response status code:', response.status);
          successToast('Product Added to Cart');
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    }
  
    return (
      <div>
        <Card sx={{ width: '300px', height: '310px', boxShadow: 'lg', marginBottom: 10 }}>
          <Link style={{ textDecoration: 'none' }} to={`/cardContent/${id}`} className="card-link">
            <CardOverflow>
              <AspectRatio sx={{ minWidth: '300px' }}>
                <img
                  src={productimgurl}
                  srcSet={productimgurl}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent className="card-content">
              <Typography level="body-xs">{category}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexDirection: 'row',
                }}
              >
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 'xl',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {productname}
                </Typography>
                <ArrowOutwardIcon />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexDirection: 'row',
                }}
              >
                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' }}
                  endDecorator={
                    <Chip component="span" size="sm" variant="soft" color="success">
                      Lowest price
                    </Chip>
                  }>
                  {productprice}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', mt: 1, fontWeight: 'xl' }}>
                  {rating}
                  <StarIcon sx={{ color: 'orange', fontSize: 20 }} />/5
                </Typography>
  
              </Box>
              <Typography level="body-sm">
                (Only <b>{stockavailable}</b> left in stock!)
              </Typography>
            </CardContent>
          </Link>
          <CardOverflow>
            {!(adminRender || vendorRender) && (
              <Button variant="solid" color="danger" size="lg" onClick={() => addToCart(product)}>
                Add to cart
              </Button>
            )}
          </CardOverflow>
        </Card>
        <ToastContainer />
      </div>
    );
  };

export default CardUI;