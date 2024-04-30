import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Product.css';
import { successToast } from '../toastHelper';

const UpdatePrice = ({ mainUserSno }) => {
  const [products, setProducts] = useState([]);
  const [priceInputs, setPriceInputs] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://localhost:8080/products/all`).then((response) => {
      console.log(response.status);
      const responseData = response.data;

      // Sort responseData by productname
      responseData.sort((a, b) => {
        if (a.productname < b.productname) {
          return -1;
        }
        if (a.productname > b.productname) {
          return 1;
        }
        return 0;
      });
      if (mainUserSno !== 0) {
        const specificVendorData = responseData.filter(product => product.vendorsno === mainUserSno);
        setProducts(specificVendorData);
      }
      else {
        setProducts(responseData);
      }

      // Initialize priceInputs for each product
      const initialPriceInputs = {};
      responseData.forEach((product) => {
        initialPriceInputs[product.productsid] = ''; // Set initial price input as empty string
      });
      setPriceInputs(initialPriceInputs);
    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  const updateprice = (id) => {
    const priceValue = {
      price: priceInputs[id], // Use price input for the specific product id
      id: id,
    };

    axios.put('http://localhost:8080/products/pricechange', priceValue)
      .then(response => {
        console.log('Response:', response.data);
        console.log(response.status);
        successToast('Updated Successfully');
        getData();
      })
      .catch(error => {
        console.error('Error is:', error);
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
    fontFamily: 'robotoRegular'
  };

  return (
    <div>
      <h2 style={{ paddingTop: '15px', fontFamily:'robotoMedium' }}>Products's List</h2>
      <center>
        <Table
          sx={{
            '& tr > *:not(:first-child)': { textAlign: 'right' },
            width: '70%',
            background: '#BFD8E9',
            "& th": {
              color: "rgba(96, 96, 96)",
              backgroundColor: "#DCD0FF",
            },
          }}
          stickyHeader
          // stickyFooter
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th style={table2CellStyle}></th>
              <th style={table2CellStyle}>Product name</th>
              <th style={table2CellStyle}>Product Price</th>
              <th style={table2CellStyle}>Stock available</th>
              <th style={table2CellStyle}>Update Price</th>
              <th style={table2CellStyle}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.productsid}>
                <td style={table2CellStyle}>
                  <img src={product.productimgurl}
                    width={100}
                  />
                </td>
                <td style={table2CellStyle}>{product.productname}</td>
                <td style={table2CellStyle}>{formatPrice(product.productprice)}</td>
                <td style={table2CellStyle}>{product.stockavailable}</td>
                <td style={table2CellStyle}>
                  <input
                    type="number"
                    value={priceInputs[product.productsid]} // Use price input for the specific product id
                    onChange={(e) => setPriceInputs({ ...priceInputs, [product.productsid]: e.target.value })}
                    placeholder="Enter Price"
                    style={{ width: 100, margin: 'auto' }}
                  />
                </td>
                <td style={table2CellStyle}>
                  <Button
                    style={{ width: 90 }}
                    variant="soft"
                    color="success"
                    onClick={() => updateprice(product.productsid)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </center>
      <ToastContainer />
    </div>
  );
};

export default UpdatePrice;