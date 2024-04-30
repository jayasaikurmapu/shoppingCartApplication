import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import '../styles/Cart.css';

const CheckOut = ({ mainUsername }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [oname, setOname] = useState('');
  const [omail, setOmail] = useState('');
  const [onumber, setOnumber] = useState('');
  const [obilladdress, setObilladdress] = useState('');
  const [ocountry, setOcountry] = useState('');
  const [oshipaddress, setOshipaddress] = useState('');

  useEffect(() => {
    setProducts([]);
    getProductData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getProductData = () => {
    axios.get(`http://localhost:8080/cart/all`).then((response) => {
      const responseData = response.data;
      const cartData = responseData.filter(data => data.username === mainUsername);
      const combinedProducts = combineProducts(cartData);
      console.log(combinedProducts);
    }).catch((error) => {
      console.error('Axios error:', error);
    });
  }

  // Calculate total quantity
  const totalQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);


  const combineProducts = async (responseData) => {
    const combinedProducts = [];

    // Step 1: Process each product in responseData
    for (const product of responseData) {
      const existingProductIndex = combinedProducts.findIndex(p => p.productid === product.productid);
      if (existingProductIndex !== -1) {
        // Product with the same id exists, update quantity, subtotal, and original price
        combinedProducts[existingProductIndex].quantity++;
        combinedProducts[existingProductIndex].subtotal += product.productprice;
      } else {
        // New product, add to the combined products list
        combinedProducts.push({ ...product, quantity: 1, subtotal: product.productprice });
      }
    }

    try {
      // Step 2: Fetch product data from 'products/all' to get the latest prices
      const productResponse = await axios.get(`http://localhost:8080/products/all`);
      const productData = productResponse.data;

      // Step 3: Process each product in combinedProducts
      for (let i = 0; i < combinedProducts.length; i++) {
        const product = combinedProducts[i];
        const matchedProduct = productData.find(p => p.productsid === product.productid);

        if (!matchedProduct) {
          // If the product in the cart does not exist in the product database, remove it from the combined products list
          combinedProducts.splice(i, 1);
          i--; // Decrement i to adjust for the removed item
        } else if (matchedProduct.productprice !== product.productprice) {
          // Update the product price in the cart data if it doesn't match the product price from 'products/all'
          combinedProducts[i].productprice = matchedProduct.productprice;
          // Update the subtotal based on the updated price and quantity
          combinedProducts[i].subtotal = combinedProducts[i].quantity * matchedProduct.productprice;
        }
      }

      // Step 4: Update the state with the updated product data and calculate total
      setProducts(combinedProducts);
      console.log(combinedProducts);
      const totalValue = combinedProducts.reduce((acc, curr) => acc + curr.subtotal, 0);
      setTotal(totalValue);
    } catch (error) {
      console.error('Axios error:', error);
    }

    return combinedProducts;
  };

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validateNumber = (number) => {
    return (number.length === 10)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!oname) {
      toast.info('Your Name is required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!omail) {
      toast.info('Your email is required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (validateEmail(omail)) {
    } else {
      setOmail('');
      toast.warn('enter a valid Mail Id', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!onumber) {
      toast.info('Your Phone number is required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!(validateNumber(onumber) && Number.isInteger(parseInt(onumber)))) {
      setOnumber('');
      toast.warn('enter a valid phone number', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!ocountry) {
      toast.info('Your country is required', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!obilladdress) {
      toast.info('Please mention your billing address', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!oshipaddress) {
      toast.info('Please mention your shipping address', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Assuming axios is imported properly

    // Assuming axios is imported properly

    // Define a synchronous function to perform the POST request
    function syncPostOrderData(orderData) {
      toast.success('Order Placed Successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return axios.post('http://localhost:8080/order/save', orderData);
    }

    async function fetchDataAndProcess() {
      try {
        const cartResponse = await axios.get(`http://localhost:8080/cart/all`);
        const cartResponseData2 = cartResponse.data;
        const cartResponseData = cartResponseData2.filter(data => data.username === mainUsername);
        console.log(cartResponseData);

        for (const [index, cartItem] of cartResponseData.entries()) {
          // Fetch product details for the current cart item
          const productResponse = await axios.get(`http://localhost:8080/products/all`);
          const filteredResponse = productResponse.data.filter(prod => prod.productsid === cartItem.productid);

          // Extract vendor number and assign it to vsno
          const vsno = filteredResponse[0].vendorsno;

          // Create order data for the current cart item
          const orderData = {
            oname: oname,
            omail: omail,
            onumber: onumber,
            country: ocountry,
            obilladdress: obilladdress,
            oshipaddress: oshipaddress,
            vsno: vsno,
            prodname: cartItem.productname,
            qty: 1,
          };

          // Call the synchronous function to post order data
          const response = await syncPostOrderData(orderData);
          console.log('Response:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchDataAndProcess();

    // axios.get(`http://localhost:8080/cart/all`)
    //   .then((cartResponse) => {
    //     const cartResponseData2 = cartResponse.data;
    //     const cartResponseData = cartResponseData2.filter(data => data.username === mainUsername);
    //     console.log(cartResponseData);

    //     // Define a function to fetch product details by product id
    //     const fetchProductDetails = async (prodid) => {
    //       try {
    //         const productResponse = await axios.get(`http://localhost:8080/products/all?productsid=${prodid}`);
    //         const filteredResponse = productResponse.data.filter(prod => prod.productsid === prodid);
    //         console.group(filteredResponse);
    //         return filteredResponse;
    //       } catch (error) {
    //         console.error('Error fetching product details:', error);
    //         throw error;
    //       }
    //     };

    //     // Define a function to process each item in the cart
    //     const processCartItem = async (cartItem, index) => {
    //       try {
    //         // Fetch product details for the current cart item
    //         const productDetails = await fetchProductDetails(cartItem.productid);
    //         console.log(productDetails);
    //         // Extract vendor number and assign it to vname
    //         const vsno = productDetails[0].vendorsno;
    //         console.log(vsno);
    //         // Create order data for the current cart item
    //         // const orderData = {
    //         //   oname: oname,
    //         //   omail: omail,
    //         //   onumber: onumber,
    //         //   country: ocountry,
    //         //   obilladdress: obilladdress,
    //         //   oshipaddress: oshipaddress,
    //         //   vsno: vsno,
    //         //   prodname: products[index].productname,
    //         //   qty: products[index].quantity,
    //         // };
    //         // console.log(orderData);
    //         axios.post('http://localhost:8080/order/save', {
    //           oname: oname,
    //           omail: omail,
    //           onumber: onumber,
    //           country: ocountry,
    //           obilladdress: obilladdress,
    //           oshipaddress: oshipaddress,
    //           vsno: vsno,
    //           prodname: products[index].productname,
    //           qty: products[index].quantity,
    //         })
    //           .then(response => {
    //             console.log('here');
    //             console.log(response);
    //           })
    //           .catch(error => {
    //             console.error('Error:', error);
    //           });
    //       } catch (error) {
    //         console.error('Error processing cart item:', error);
    //       }
    //     };

    //     // Process each item in the cart
    //     cartResponseData.forEach((cartItem, index) => processCartItem(cartItem, index));
    //   })
    //   .catch((error) => {
    //     console.error('Axios error:', error);
    //   });
  }

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <div>
      <h2 className='checkOutHeading'>CheckOut</h2>
      <center>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, flexDirection: 'row' }}>
          <Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' }, width: '45%' }} >
            <thead>
              <tr>
                <th style={table2CellStyle}>Product</th>
                <th style={table2CellStyle}>Product Price</th>
                <th style={table2CellStyle}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td style={table2CellStyle}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexDirection: 'row' }}>
                      {product.productname}
                      <ClearIcon /> {product.quantity}
                    </Box>
                  </td>
                  <td style={table2CellStyle}>{formatPrice(product.productprice)}</td>
                  <td style={table2CellStyle}>{formatPrice(product.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </Table>


          <form>
            <h3 style={{fontFamily: 'robotoMedium'}}>Billing Details</h3>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              <div className='textField'>
                <TextField
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={oname}
                  onChange={(e) => setOname(e.target.value)}
                  required
                />
              </div>
              <div className='textField'>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="text"
                  required
                  value={omail}
                  onChange={(e) => setOmail(e.target.value)}
                />
              </div>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              <div className='textField'>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  type="text"
                  required
                  value={onumber}
                  onChange={(e) => setOnumber(e.target.value)}
                />
              </div>
              <div className='textField'>
                <TextField
                  label="Billing Address"
                  variant="outlined"
                  type="text"
                  required
                  value={obilladdress}
                  onChange={(e) => setObilladdress(e.target.value)}
                />
              </div>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              <div className='textField'>
                <TextField
                  label="Country"
                  variant="outlined"
                  type="text"
                  required
                  value={ocountry}
                  onChange={(e) => setOcountry(e.target.value)}
                />
              </div>
              <div className='textField'>
                <TextField
                  label="Shipping Address"
                  variant="outlined"
                  type="text"
                  required
                  value={oshipaddress}
                  onChange={(e) => setOshipaddress(e.target.value)}
                />
              </div>
            </Box>
            <center>
              <Button
                style={{ marginTop: 30, width: 150 }}
                color="success"
                onClick={handleSubmit}
                variant="soft">
                Place Order of {formatPrice(total)}
              </Button>
            </center>
          </form>
        </Box>
      </center>
      <ToastContainer />
    </div>
  );
};

export default CheckOut;