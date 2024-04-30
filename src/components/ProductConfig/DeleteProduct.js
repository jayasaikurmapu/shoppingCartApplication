import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Product.css'

const DeleteProduct = ({ mainUserSno }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`http://localhost:8080/products/all`).then((response) => {
      console.log(response.status);
      const responseData = response.data;
      responseData.sort((a, b) => {
        if (a.productname < b.productname) {
          return -1;
        }
        if (a.productname > b.productname) {
          return 1;
        }
        return 0;
      });
      if (typeof mainUserSno !== 'undefined') {
        const specificVendorData = responseData.filter(product => product.vendorsno === mainUserSno);
        setProducts(specificVendorData);
      }
      else {
        setProducts(responseData);
      }

    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
    fontFamily: 'robotoRegular'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const deleteProduct = (productsid) => {
    axios.delete(`http://localhost:8080/products/delete/${productsid}`).then((response) => {
      console.log(response.data);
      console.log(response.status);
      toast.success(`Product deleted Successfully`, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData(); // Refresh the vendor list after deletion
    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <div>
      <h2 className='pageHeading'>Products's List</h2>
      <center>
        <Table
          sx={{
            "& th": {
              color: "rgba(96, 96, 96)",
              backgroundColor: "#E6E6FA",
            },
            '& tr > *:not(:first-child)': { textAlign: 'right' },
            width: '70%',
            background: '#BFD8E9',
          }}
          stickyHeader
          // stickyFooter
          stripe="odd"
          hoverRow
        >
          <thead>
            <tr>
              <th style={table2CellStyle}></th>
              <th style={table2CellStyle}>Name</th>
              <th style={table2CellStyle}>Price</th>
              <th style={table2CellStyle}>Avg. Rating</th>
              <th style={table2CellStyle}>Stock available</th>
              <th style={table2CellStyle}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.productsid}>
                <td style={table2CellStyle}>
                  <img src={product.productimgurl} width={100} />
                </td>
                <td style={table2CellStyle}>{product.productname}</td>
                <td style={table2CellStyle}>{formatPrice(product.productprice)}</td>
                <td style={table2CellStyle}>{product.rating}</td>
                <td style={table2CellStyle}>{product.stockavailable}</td>
                <td style={table2CellStyle}>
                  <Button size="sm" variant="soft" endDecorator={<DeleteOutlineIcon />} color="danger" onClick={() => deleteProduct(product.productsid)}>
                    Remove
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

export default DeleteProduct;
