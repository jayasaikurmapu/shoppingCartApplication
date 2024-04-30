import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import '../styles/Product.css';
import { successToast, warningToast, infoToast } from '../toastHelper';

export default function AddProduct({ mainUserSno }) {
  const [productname, setProductname] = useState('');
  const [productprice, setProductprice] = useState(0.0);
  const [productdesc, setProductdesc] = useState('');
  const [productimgurl, setProductimgurl] = useState('');
  const [stockavailable, setStockavailable] = useState(0);
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    const productData = {
      productname: productname,
      productprice: productprice,
      productdesc: productdesc,
      productimgurl: productimgurl,
      vendorsno: mainUserSno,
      stockavailable: stockavailable,
      category: category,
    };

    if (!productname) {
      infoToast('Product Name is required');
      return;
    }
    if (!productprice) {
      infoToast('Product Price is required');
      return;
    }

    if (!Number.isInteger(parseInt(productprice))) {
      setProductprice(0.0);
      warningToast('enter a valid Product Price');
      return;
    }

    if (productprice <= 1) {
      setProductprice(0.0);
      warningToast('price must be greater than 1Rs.');
      return;
    }

    if (!productdesc) {
      infoToast('Product Description is required');
      return;
    }
    if (!productimgurl) {
      infoToast('URL of Product image is required');
      return;
    }
    if (!stockavailable) {
      infoToast('Please mention the available stock of this product');
      return;
    }

    if (!Number(stockavailable)) {
      console.log('here')
      setStockavailable(0);
      warningToast('enter a valid number of stock available');
      return;
    }

    if (!category) {
      infoToast('Product Category is required');
      return;
    }
    axios.post('http://localhost:8080/products/save', productData)
      .then(response => {
        console.log(response.status);
        console.log(productData);
        setTimeout(() => {
          successToast('Product Added');
        }, 300);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Reset form fields 
    // setProductname('');
    // setProductprice(0.0);
    // setProductdesc('');
    // setProductimgurl('');
    // setStockavailable(0);
  }
  return (
    <>
      <div className='addProductContainer'>
        <center>
          <Typography className='h3Style' variant="h3" gutterBottom>
            Add a new Product
          </Typography>
          <form>
            <Box className='boxStyle' sx={{ gap: 10 }}>
              <div style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }} classnam='textField'>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  type="text"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                  required
                />
              </div>
              <div style={{  marginTop: 30 }}>
                <TextField
                  label="Product Price"
                  variant="outlined"
                  type="text"
                  required
                  value={productprice}
                  onChange={(e) => setProductprice(e.target.value)}
                />
              </div>
            </Box>
            <Box className='boxStyle' sx={{ gap: 10 }}>
              <div style={{ marginTop: 30 }}>
                <TextField
                  label="Product Description"
                  variant="outlined"
                  type="text"
                  required
                  value={productdesc}
                  onChange={(e) => setProductdesc(e.target.value)}
                />
              </div>
              <div style={{ marginTop: 30 }}>
                <TextField
                  label="Product image Url"
                  variant="outlined"
                  type="text"
                  required
                  value={productimgurl}
                  onChange={(e) => setProductimgurl(e.target.value)}
                />
              </div>
            </Box>
            <Box className='boxStyle' sx={{ gap: 10 }}>
              <div style={{ marginTop: 30 }}>
                <TextField
                  label="Stock Available"
                  variant="outlined"
                  type="text"
                  required
                  value={stockavailable}
                  onChange={(e) => setStockavailable(e.target.value)}
                />
              </div>
              <div style={{ marginTop: 30 }}>
                <TextField
                  label="Category"
                  variant="outlined"
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </Box>
            <center>
              <Button
                style={{ marginTop: 30, width: 150 }}
                color="success"
                onClick={handleSubmit}
                variant="soft">
                Add Product
              </Button>
            </center>
          </form>
        </center>
      </div>
      <ToastContainer />
    </>
  )
}
