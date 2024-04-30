import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/joy/Table';

const VendorProducts = ({mainUserSno, mainUsername}) => {
  const [vendorProds, setVendorProds] = useState([]);

  useEffect(() => {
    getData();
  },[]);

    const getData = () => {

        axios.get(`http://localhost:8080/products/all`).then((response) => {
            const productsData = response.data;

            productsData.sort((a, b) => {
              if (a.productname < b.productname) {
                return -1;
              }
              if (a.productname > b.productname) {
                return 1;
              }
              return 0;
            });

            // Filter productsData based on condition
            const filteredProductData = [];
            productsData.forEach(product => {
                if (mainUserSno === product.vendorsno) {
                filteredProductData.push(product);
                }
            });
            console.log(filteredProductData);

            setVendorProds(filteredProductData);
        })
        .catch((error) => {
            console.error('Axios error:', error);
        });
    }

    const table2CellStyle = {
      padding: '8px',
      textAlign: 'center',
      BorderRight: 'hidden',
    };


  return (
    <div>
      <h2 style={{paddingTop:'10px'}}>Vendor {mainUsername}'s List</h2>
      <center>
        <h3>(The products uploaded by you)</h3>
        <Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' }, width: '70%'}} >
          <thead>
            <tr>
              <th style={table2CellStyle}></th>
              <th style={table2CellStyle}>Product Name</th>
              <th style={table2CellStyle}>Product Price</th>
              <th style={table2CellStyle}>Average Rating</th>
              <th style={table2CellStyle}>Total Stock available</th>
            </tr>
          </thead>
          <tbody>
            {vendorProds.map((product, index) => (
              <tr key={index}>
                <td style={table2CellStyle}>
                  <img src={product.productimgurl} width={100} alt='product-image'/>
                </td>
                <td style={table2CellStyle}>{product.productname}</td>
                <td style={table2CellStyle}>{product.productprice}</td>
                <td style={table2CellStyle}>{product.rating}</td>
                <td style={table2CellStyle}>{product.stockavailable}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </center>
    </div>
  );
};

export default VendorProducts;
