import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/Logon.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/joy/Checkbox';
import Close from '@mui/icons-material/Close';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import { successToast, warningToast, errorToast, infoToast } from '../toastHelper';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [number, setNumber] = useState('');
  const [show, setShow] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [otp, setOtp] = useState('');
  const history = useHistory();
  const minLength = 8;

  const validateEmail = (email) => {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validateNumber = (number) => {
    return (number.length === 10)
  }

  const handleSubmit3 = (event) => {
    if (!otp) {
      warningToast('Enter an OTP');
      return;
    }
    else {
      const emailRequest = {
        email: email2,
        otp: otp,
      };

      axios.post('http://localhost:8080/signup/verify', emailRequest).then(response => {
        console.log(response.status);
        if (response.data === 'Successfully verified') {
          setTimeout(() => {
            successToast('OTP Verified Successfully');
            successToast('User Added');
            return;
          }, 3000);
          // window.location.href = '/';
          history.push('/');
        }
        else if (response.data === 'You have entered the wrong OTP') {
          errorToast('You have entered the wrong OTP, enter valid OTP lo register yourselves');
          return;
        }
      })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    setOtp('');
  };

  const post = () => {
    const signupData = {
      username: username,
      password: password,
      email: email,
      number: '+91' + number,
      vendor: isVendor,
    };

    axios.post('http://localhost:8080/signup/save', signupData)
      .then(response => {
        console.log(response.status);
        const onlyEmail = {
          email: email,
        };

        setEmail2(email);
        setTimeout(() => {
          axios.put('http://localhost:8080/signup/otp', onlyEmail)
            .then(response => {
              console.log(response.status);
                successToast('OTP Sent to Email');
                return;
            })
            .catch(error => {
              console.error('Error is:', error);
            });
        }, 300);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setNumber('');
    setShow(true);

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8080/signup/all`).then((respo) => {
      console.log(respo.status);
      const responseData = respo.data;
      const enteredUsername = username;
      const enteredEmail = email;
      const enteredNumber = number;

      const is_user = responseData.find((user) => user.username === enteredUsername);
      const is_existing_email = responseData.find((user) => user.email === enteredEmail);
      const is_existing_number = responseData.find((user) => user.number === '+91' + enteredNumber);

      if (!username) {
        infoToast('Username is required');
        return;
      }
      if (!password) {
        infoToast('Password is required');
        return;
      }

      if (password.length < 8) {
        warningToast('enter password of length 8 characters minimum');
        return;
      }

      if (password !== confirmPassword) {
        warningToast('Passwords do-not match');
        return;
      }

      if (!email) {
        infoToast('Email is required');
        return;
      }

      if (validateEmail(email)) {
      } else {
        warningToast('enter a valid email-id');
        return;
      }

      if (!number) {
        infoToast('Phone number is required');
        return;
      }

      if (!(validateNumber(number) && Number.isInteger(parseInt(number)))) {
        warningToast('enter a valid 10-digit Phone number');
        return;
      }

      if (is_user !== undefined) {
        setUsername('');
        errorToast('Username already exists, enter a new username');
        return;
      }
      if (is_existing_email !== undefined) {
        setEmail('');
        errorToast('Email already exists, enter a new Email');
        return;
      }
      if (is_existing_number !== undefined) {
        setNumber('');
        errorToast('Phone number already exists, enter a new phone number');
        return;
      }

      post();

    })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <>
      {show ? (
        <>
          <div style={{ marginTop: '30px' }}>
            <center>
              <>
                <Typography style={{ fontSize: 30, marginTop: 100 }} variant="h3" gutterBottom>
                  Enter OTP recieved on your registered email
                </Typography>
                <form>
                  <div>
                    <TextField
                      label="Enter OTP"
                      variant="outlined"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ position: 'relative', marginTop: '20px', marginLeft: '0px', paddingRight: '0px' }}
                      required
                    />
                  </div>

                  <center>
                    <Button
                      style={{ marginTop: 30 }}
                      onClick={handleSubmit3}
                      variant="contained">
                      Submit
                    </Button>
                  </center>
                </form>
              </>
            </center>
          </div>
        </>
      ) : (
        <div className='loginContainer'>
          <center>
            <Typography style={{ fontSize: 40 }} variant="h3" gutterBottom>
              Sign Up
            </Typography>
            <form>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <div className='signupFields' style={{ marginTop: 3 }}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className='signupFields' style={{ marginTop: 40 }}>
                  <Stack
                    spacing={0.5}
                    sx={{
                      '--hue': Math.min(password.length * 10, 120),
                    }}
                  >
                    <TextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <LinearProgress
                      determinate
                      size="sm"
                      value={Math.min((password.length * 100) / minLength, 100)}
                      sx={{
                        bgcolor: 'background.level3',
                        color: 'hsl(var(--hue) 80% 40%)',
                      }}
                    />
                    <Typography
                      level="body-xs"
                      sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                    >
                      {password.length <= 3 && 'Very weak'}
                      {password.length >= 4 && password.length < 6 && 'Weak'}
                      {password.length >= 6 && password.length < 8 && 'Strong'}
                      {password.length >= 8 && 'Very strong'}
                    </Typography>
                  </Stack>
                </div>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ marginTop: 40 }}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginTop: 65, marginLeft: 25 }}>
                  <Checkbox
                    label="Are you a Vendor?"
                    checked={isVendor}
                    uncheckedIcon={<Close />}
                    onChange={(e) => setIsVendor(e.target.checked)}
                  />
                </div>
              </Box>
              <center>
                <Button
                  style={{ marginTop: 30 }}
                  onClick={handleSubmit}
                  variant="contained">
                  SignUp
                </Button>
              </center>
            </form>
            <Typography style={{ marginTop: 16, fontSize: 17 }} variant="h6" gutterBottom>
              Already have an account?
              <Box component="span" sx={{ marginLeft: 1 }}>
                <Link to="/">
                  Login
                </Link>
              </Box>
            </Typography>
          </center>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Signup;
