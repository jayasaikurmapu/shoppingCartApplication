import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
// mui importd
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Badge from '@mui/joy/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
// Toast imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components imports
import About from '../src/components/About/About';
import Logins from '../src/components/Authorization/Logon';
import Signup from '../src/components/Authorization/Signup';
import Cart from '../src/components/Cart/Cart';
import CheckOut from '../src/components/Cart/CheckOut';
import Home from '../src/components/Home/Home';
import AddProduct from '../src/components/ProductConfig/AddProduct';
import DeleteProduct from '../src/components/ProductConfig/DeleteProduct';
import UpdatePrice from '../src/components/ProductConfig/UpdatePrice';
import CardContent from '../src/components/Shop/CardContent';
import CardGrid from '../src/components/Shop/CardGrid';
import SearchByCategory from '../src/components/Shop/SearchByCategory';
import ConfigureVendor from '../src/components/VendorConfig/ConfigureVendor';
import VendorProducts from '../src/components/VendorConfig/VendorProducts';
import YourOrders from '../src/components/VendorConfig/YourOrders';

function App() {
  const [cardNumber, setCardNumber] = useState(null);
  const [customerRender, setCustomerRender] = useState(false);
  const [vendorRender, setVendorRender] = useState(false);
  const [adminRender, setAdminRender] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [mainUsername, setMainUsername] = useState('');
  const [mainUserSno, setMainUserSno] = useState(0);
  const [numOfCart, setNumOfCart] = useState(0);

  useEffect(() => {
    fetchData();
    deleteRejectedRecords();
  }, []);

  useEffect(() => {
    if (adminRender){
      toast.success("admin login successful");
    }
    else if (vendorRender){
      toast.success("vendor login successful");
    }
    else if (customerRender){
      toast.success("customer login successful");
    }
  }, [adminRender, vendorRender, customerRender]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/all');
      setCardData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteRejectedRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/signup/all');
      const rejectedRecords = response.data.filter(record => record.otpstatus === 'Rejected');
      if (rejectedRecords.length > 0) {
        await Promise.all(rejectedRecords.map(record => axios.delete(`http://localhost:8080/signup/delete/${record.username}`)));
        console.log('Rejected records deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting rejected records:', error);
    }
  };

  const logout = () => {
    setTimeout(() => {
      toast.success('Logout successful');
    }, 3000);
    window.location.href = '/'
  }

  return (
    <Router>
      <div className="App">
        <div className="header">
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="title" style={{ display: 'flex', flexDirection: 'column' }}>
              {mainUserSno ? (<p style={{ fontSize: 11, marginLeft: 1.5 }}>hello {mainUsername}, welcome to </p>) : (<></>)}

              <div style={{ display: 'flex' }}>
                CapstoneStore <FontAwesomeIcon icon={faTruckFast} />
              </div>
            </div>
          </Link>

          {adminRender ? (
            <div className="text">
              <Link to="/home"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Home</Button></Link>
              <Link to='/cardGrid'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Shop</Button></Link>
              <Link to='/about'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">About</Button></Link>
              <Link to="/addproduct"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Add Product</Button></Link>
              <Link to="/deleteproduct"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Delete Product</Button></Link>
              <Link to='/configurevendor'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Configure Vendors</Button></Link>
              <Link to='/priceupdate'><Button sx={{ fontFamily: 'robotoRegular' }} style={{ marginRight: 40 }} color='#FFD700' variant="plain">Update Price</Button></Link>
              <a href='#'>
                <Tooltip arrow title="Logout">
                  <Button color='#FFD700' onClick={logout} variant="plain" >
                    <LogoutIcon />
                  </Button>
                </Tooltip>
              </a>
            </div>
          ) : vendorRender ? (
            <div className="text">
              <Link to="/home"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Home</Button></Link>
              <Link to='/cardGrid'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Shop</Button></Link>
              <Link to='/about'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">About</Button></Link>
              <Link to="/addproduct"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Add Product</Button></Link>
              <Link to="/deleteproduct"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Delete Product</Button></Link>
              <Link to='/priceupdate'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Update Price</Button></Link>
              <Link to="/yourorders"><Button sx={{ fontFamily: 'robotoRegular' }} style={{ marginRight: 40 }} color='#FFD700' variant="plain">Your Orders</Button></Link>
              <Button color='#FFD700' onClick={logout} variant="plain" ><LogoutIcon /></Button>
            </div>
          ) : customerRender ? (
            <div className="text">
              <Link to="/home"><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Home</Button></Link>
              <Link to='/cardGrid'><Button sx={{ fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">Shop</Button></Link>
              <Link to='/about'><Button style={{ marginRight: 280, fontFamily: 'robotoRegular' }} color='#FFD700' variant="plain">About</Button></Link>
              <Link to="/cart"><Tooltip arrow title="Cart"><Badge badgeContent={numOfCart}><ShoppingCartIcon color='white' /></Badge></Tooltip></Link>
              <Tooltip arrow title="Logout"><Button color='#FFD700' onClick={logout} variant="plain" ><LogoutIcon /></Button></Tooltip>
            </div>
          ) : null}
        </div>
      </div>

      {adminRender ? (
        <div>
          <Switch>
            <Route path='/home'><Home cardData={cardData} /></Route>
            <Route path='/cardGrid'><CardGrid adminRender={adminRender} setNumOfCart={setNumOfCart} numOfCart={numOfCart} setCardNumber={setCardNumber} fetchData={fetchData} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/priceupdate'><UpdatePrice mainUserSno={mainUserSno} /></Route>
            <Route path="/cardContent/:index"><CardContent adminRender={adminRender} cardNumber={cardNumber} cardData={cardData} /></Route>
            <Route path='/configurevendor'><ConfigureVendor /></Route>
            <Route path='/about'><About /></Route>
            <Route path='/searchcategory'><SearchByCategory setNumOfCart={setNumOfCart} numOfCart={numOfCart} adminRender={adminRender} setCardNumber={setCardNumber} fetchData={fetchData} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/deleteproduct'><DeleteProduct /></Route>
            <Route path='/addproduct'><AddProduct /></Route>
            <Route path='/'><Home setCardNumber={setCardNumber} cardData={cardData} /></Route>
          </Switch>
        </div>
      ) : vendorRender ? (
        <div>
          <Switch>
            <Route path='/home'><Home cardData={cardData} /></Route>
            <Route path='/cardGrid'><CardGrid setCardNumber={setCardNumber} setNumOfCart={setNumOfCart} numOfCart={numOfCart} vendorRender={vendorRender} fetchData={fetchData} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/priceupdate'><UpdatePrice mainUserSno={mainUserSno} /></Route>
            <Route path='/about'><About /></Route>
            <Route path='/deleteproduct'><DeleteProduct mainUserSno={mainUserSno} /></Route>
            <Route path='/yourorders'><YourOrders mainUserSno={mainUserSno} /></Route>
            <Route path="/cardContent/:index"><CardContent cardNumber={cardNumber} vendorRender={vendorRender} cardData={cardData} /></Route>
            <Route path='/searchcategory'><SearchByCategory setNumOfCart={setNumOfCart} numOfCart={numOfCart} setCardNumber={setCardNumber} vendorRender={vendorRender} fetchData={fetchData} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/vendorproducts'><VendorProducts mainUserSno={mainUserSno} mainUsername={mainUsername} /></Route>
            <Route path='/addproduct'><AddProduct mainUserSno={mainUserSno} mainUsername={mainUsername} /></Route>
            <Route path='/'><Home setCardNumber={setCardNumber} cardData={cardData} /></Route>
          </Switch>
        </div>
      ) : customerRender ? (
        <div>
          <Switch>
            <Route path='/home'><Home cardData={cardData} /></Route>
            <Route path='/cardGrid'><CardGrid setCardNumber={setCardNumber} setNumOfCart={setNumOfCart} numOfCart={numOfCart} fetchData={fetchData} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/about'><About /></Route>
            <Route path='/checkout'><CheckOut mainUsername={mainUsername} /></Route>
            <Route path='/searchcategory'><SearchByCategory setNumOfCart={setNumOfCart} numOfCart={numOfCart} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path="/cardContent/:index"><CardContent cardNumber={cardNumber} cardData={cardData} mainUsername={mainUsername} /></Route>
            <Route path='/cart'><Cart mainUsername={mainUsername} setNumOfCart={setNumOfCart} /></Route>
            <Route path='/'><Home setCardNumber={setCardNumber} cardData={cardData} /></Route>
          </Switch>
        </div>
      ) : (
        <div>
          <Switch>
            <Route path='/signup'><Signup /></Route>
            <Route path='/'><Logins
              setAdminRender={setAdminRender}
              setVendorRender={setVendorRender}
              setCustomerRender={setCustomerRender}
              setMainUsername={setMainUsername}
              setMainUserSno={setMainUserSno} /></Route>
          </Switch>
        </div>
      )}

      <ToastContainer />
    </Router>
  );
}

export default App;
