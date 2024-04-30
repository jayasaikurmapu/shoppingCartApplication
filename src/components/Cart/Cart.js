import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Table from '@mui/joy/Table';
import '../styles/Cart.css';

const Cart = ({ mainUsername, setNumOfCart }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setProducts([]);
    getProductData();
  }, []);

  const handleCheckoutClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the checkout page after the loading delay
      history.push('/checkout');
    }, 1000);
  };

  const getProductData = () => {
    axios.get(`http://localhost:8080/cart/all`).then((response) => {
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
      console.log(mainUsername);
      const cartData = responseData.filter(data => data.username === mainUsername);
      const combinedProducts = combineProducts(cartData);
      console.log(combinedProducts);
    }).catch((error) => {
      console.error('Axios error:', error);
    });
  }

  const totalQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);
  setNumOfCart(totalQuantity);

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

  const handleClick = (cartId) => {
    axios.delete(`http://localhost:8080/cart/delete/${cartId}`).then((response) => {
      console.log(response.data);
      console.log(response.status);
      getProductData();
    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  const handleClick2 = (prodId) => {
    axios.get(`http://localhost:8080/cart/all`).then((response) => {
      const responseData = response.data;
      const cartData = responseData.filter(data => data.username === mainUsername);
      const filteredData = cartData.filter(item => item.productid === prodId);
      // Iterate over filteredData and make a delete request for each item
      filteredData.forEach(item => {
        axios.delete(`http://localhost:8080/cart/delete/${item.id}`)
          .then((response) => {
            console.log(response.data);
            console.log(response.status);
            // Call getProductData() after each successful deletion if needed
            getProductData();
          })
          .catch((error) => {
            console.error('Axios error:', error);
          });
      });
    }).catch((error) => {
      console.error('Axios error:', error);
    });
  }

  const handleClick3 = (cartInfo) => {
    const productData = {
      username: mainUsername,
      productsid: cartInfo.productid,
      productname: cartInfo.productname,
      productprice: cartInfo.productprice,
    };

    axios.post('http://localhost:8080/cart/save', productData)
      .then(response => {
        console.log(response.data);
        getProductData();
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  const table2CellStyle = {
    padding: '8px',
    textAlign: 'center',
    borderRight: 'hidden',
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <>
      {totalQuantity > 0 ? (
        <div>
          <h2 className='cartHeading'>Your Cart</h2>
          <center>
            <Table sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' }, width: '70%' }} >
              <thead>
                <tr>
                  {/* <th style={table2CellStyle}></th> */}
                  <th style={table2CellStyle}>Product</th>
                  <th style={table2CellStyle}>Price</th>
                  <th style={table2CellStyle}>Quantity</th>
                  <th style={table2CellStyle}>Subtotal</th>
                  <th style={table2CellStyle}></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    {/* <td style={table2CellStyle}>
                      <img src={product.productimgurl} width={100} />
                    </td> */}
                    <td style={table2CellStyle}>{product.productname}</td>
                    <td style={table2CellStyle}>{formatPrice(product.productprice)}</td>
                    <td style={table2CellStyle}>
                      <Box sx={{ display: 'flex', marginLeft: 5, alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Button style={{ width: 3 }} variant="soft" onClick={() => handleClick(product.id)}>
                          <RemoveIcon />
                        </Button>
                        <div>{product.quantity}</div>
                        <Button style={{ width: 3 }} variant="soft" onClick={() => handleClick3(product)}>
                          <AddIcon />
                        </Button>
                      </Box>
                    </td>
                    <td style={table2CellStyle}>{formatPrice(product.subtotal)}</td>
                    <td style={table2CellStyle}>
                      <Button size="sm" variant="soft" color="danger" onClick={() => handleClick2(product.productid)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h3 className='totalPrice'>Total: {formatPrice(total)}</h3>
            <Box sx={{ display: 'flex', marginLeft: 5, alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Button
                style={{ width: 200 }}
                variant="solid"
                endDecorator={<KeyboardArrowRight />}
                color="success"
                onClick={handleCheckoutClick}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Go to checkout'}
              </Button>
              <Button style={{ width: 10 }} loading={isLoading} variant="plain">
              </Button>
            </Box>

          </center>
        </div>
      ) : (
        <div className='emptyCart'>
          <h2 className='emptyCartHeading'>YOUR CART IS EMPTY<SentimentVeryDissatisfiedIcon /></h2>
          <Link to='./cardGrid'>
            <Button
              style={{ marginTop: 20, width: 'auto', fontFamily: 'robotoRegular' }}>
              SHOP NOW
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;