import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import '../styles/Product.css';

const YourOrders = ({ mainUserSno }) => {
  const [orders, setOrders] = useState([]);

  const getData = () => {
    axios.get(`http://localhost:8080/order/all`).then((response) => {
      const responseData = response.data;
      console.log(response.status);

      if (typeof mainUserSno !== 'undefined') {
        const specificVendorData = responseData.filter(product => product.vsno === mainUserSno);
        console.log(specificVendorData);
        setOrders(specificVendorData);
      }
      else {
        setOrders(responseData);
      }

    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
    fontFamily: 'robotoRegular'
  };


  return (
    <div>
      <h2 className='pageHeading'>Order's List</h2>
      <center>
        <Table
          sx={{
            "& th": {
              color: "rgba(96, 96, 96)",
              backgroundColor: "#E6E6FA",
            },
            '& tr > *:not(:first-child)': { textAlign: 'right' },
            width: '80%',
            background: '#BFD8E9',
          }}
          stickyHeader
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th style={table2CellStyle}>Product Name</th>
              <th style={table2CellStyle}>Quantity</th>
              <th style={table2CellStyle}>Shipping Address</th>
              <th style={table2CellStyle}>Country</th>
              <th style={table2CellStyle}>Order email</th>
              <th style={table2CellStyle}>Order Number</th>
              <th style={table2CellStyle}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product, index) => (
              <tr key={product.productsid}>
                <td style={table2CellStyle}>{product.prodname}</td>
                <td style={table2CellStyle}>{product.qty}</td>
                <td style={table2CellStyle}>{product.oshipaddress}</td>
                <td style={table2CellStyle}>{product.country}</td>
                <td style={table2CellStyle}>{product.omail}</td>
                <td style={table2CellStyle}>{product.onumber}</td>

                <td style={table2CellStyle}>
                  <Button size="sm" variant="soft" endDecorator={<DoneOutlineIcon />}
                    color="success"
                  >
                    Accept Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </center>
    </div>
  );
};

export default YourOrders;
