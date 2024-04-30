import React, { useState, useEffect } from 'react';
import '../styles/Logon.css';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { successToast, warningToast, errorToast, infoToast } from '../toastHelper';


const Logon = ({ setAdminRender, setVendorRender, setCustomerRender, setMainUsername, setMainUserSno }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    deleteRejectedRecords();
  }, []);

  const deleteRejectedRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8080/signup/all');
      console.log(response.status);
      const rejectedRecords = response.data.filter(record => record.otpstatus === 'Rejected');
      if (rejectedRecords.length > 0) {
        await Promise.all(rejectedRecords.map(record => axios.delete(`http://localhost:8080/signup/delete/${record.username}`)));
      }
    } catch (error) {
      console.error('Error deleting rejected records:', error);
    }
  };

  const handleUsernameChange = (e) => {
    setMainUsername(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginCredentials = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:8080/signup/validation', loginCredentials)
      .then(response => {
        console.log(response);

        axios.get(`http://localhost:8080/signup/all`).then((respo) => {
          const responseData = respo.data;
          console.log(respo.status);
          console.log(responseData);
          const enteredUsername = username;
          const user = responseData.find((user) => user.username === enteredUsername);

          if (enteredUsername === 'admin') {
            successToast('Admin Login successful');
            setAdminRender(true);
            setVendorRender(false);
            setCustomerRender(false);
          }
          else {
            if (user) {
              if (response.data === true) {
                if (user.vendor) {
                  if (user.status === 'Accepted') {
                    successToast('Vendor Login successful');
                    setAdminRender(false);
                    setVendorRender(true);
                    setCustomerRender(false);
                    setMainUserSno(user.sno);
                  }
                  else if (user.status === 'Pending') {
                    warningToast(`Hi ${user.username}, your vendor registration is yet to be approved by admin`);
                    return;
                  }
                  else {
                    errorToast('Your are not approved to register on our website, thank you');
                    return;
                  }
                }
                else {
                  successToast('User Login successful');
                  setAdminRender(false);
                  setVendorRender(false);
                  setCustomerRender(true);
                  setMainUserSno(user.sno);
                }

              } else {
                setAdminRender(false);
                setVendorRender(false);
                setCustomerRender(false);
                errorToast('Incorrect Password');
                return;
              }
            } else {
              errorToast('User not found');
              setAdminRender(false);
              setVendorRender(false);
              setCustomerRender(false);
              return;
            }
            setUsername('');
            setPassword('');
          }
        })
          .catch((error) => {
            console.error('Axios error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='loginContainer'>
        <div>
          <center>
            <Typography style={{ marginTop: 15, fontSize: 40 }} variant="h3" gutterBottom>
              Login
            </Typography>
          </center>
          <form>
            <div className='textField'>
              <center>
                <TextField
                  label="Username"
                  variant="outlined"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </center>
            </div>
            <div className='textField'>
              <center>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </center>
            </div>
          </form>
          <div>

            <center>
              <Link to="/cardGrid">
                <Button
                  style={{ marginTop: 15 }}
                  onClick={handleSubmit}
                  variant="contained">
                  Login
                </Button>
              </Link>
              <Typography style={{ marginTop: 16, fontSize: 17 }} variant="h6" gutterBottom>
                New User?
                <Box component="span" marginLeft={1}>
                  <Link to="/signup">
                    Signup
                  </Link>
                </Box>
              </Typography>
              <br />
            </center>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Logon;