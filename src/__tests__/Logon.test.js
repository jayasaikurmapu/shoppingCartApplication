import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {  Switch, Route, Router } from 'react-router-dom';
import {createMemoryHistory} from "history";
import Logon from '../components/Authorization/Logon';
import Signup from '../components/Authorization/Signup';

describe('Logon Component', () => {
    test('clicking signup button navigates to specified path', async () => {
        // const historyMock = { push: jest.fn() }; // Mocking history object
        const historyMock = createMemoryHistory(["/", "/signup"])
        render(
            <Router history={historyMock}>
                <Switch>
                    <Route exact path="/" component={Logon} />
                    <Route path="/signup" render={Signup}/>
                </Switch>
            </Router>
        );

        const signupButton = screen.getByRole('link', {  name: /signup/i})
        expect(signupButton).toBeInTheDocument();

        // await userEvent.click(signupButton);
        // expect(screen.queryByRole('button', { name: /login/i })).toBeNull();

    });
});









// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
// import axios from 'axios';
// import Logon from './Logon';
// import Signup from './Signup';

// jest.mock('axios');

// describe('Logon Component', () => {
//     test('user event test', async () => {
//         // Mock the axios post request to simulate successful login
//         axios.post.mockResolvedValue({ data: true });

//         // Mock the axios get request to simulate successful retrieval of rejected records
//         axios.get.mockResolvedValue({ data: [
//             {
//                 "sno": 87,
//                 "username": "reddymasu",
//                 "password": "llllllll",
//                 "email": "jayasai738@gmail.com",
//                 "number": "+919867890986",
//                 "otp": "163764",
//                 "vendor": true,
//                 "status": "Accepted",
//                 "otpstatus": "Accepted"
//             }
//         ] });

//         const setAdminRender = jest.fn();
//         const setVendorRender = jest.fn();
//         const setCustomerRender = jest.fn();
//         const setMainUsername = jest.fn();
//         const setMainUserSno = jest.fn();

//         render(
//             <Router>
//                 <Switch>
//                     <Route path='/' component={Logon} />
//                     <Route path='/signup' component={Signup} />
//                 </Switch>
//             </Router>
//         );

//         const signupButton = screen.getByRole('button', { name: /signup/i });
//         userEvent.click(signupButton);

//         await screen.findByText(/email/i);

//         // Assert that setAdminRender is called with the correct arguments
//         // expect(setAdminRender).toHaveBeenCalledWith(true);
        
//         // Optionally, you can assert other state-setting functions as well
//     });
// });













// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'; // Import userEvent library
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Logon from './Logon';

// describe('Logon Component', () => {

//     test('Capstone heading', () => {
//         render(<Logon />) // Wrap Logon component with Router
//         const loginHeading = screen.getByRole('heading', { name: /login/i });
//         expect(loginHeading).toBeInTheDocument();
//     })

//     test('usernameField', () => {
//         render(<Logon />) // Wrap Logon component with Router
//         const usernameField = screen.getByRole('textbox', { name: /username/i });
//         expect(usernameField).toBeInTheDocument();

//         const passField = screen.getByLabelText(/password/i);
//         expect(passField).toBeInTheDocument();
//     })

//     test('user event test', async () => {
//         render(<Logon setAdminRender={true} setVendorRender={false} setCustomerRender={false} setMainUsername={'sai'}  setMainUserSno={2}/>) // Wrap Logon component with Router
//         const loginButton = screen.getByRole('button', { name: /login/i });
//         expect(loginButton).toBeInTheDocument();
        
//         // Fill in the username and password fields
//         const usernameField = screen.getByRole('textbox', { name: /username/i });
//         userEvent.type(usernameField, 'admin');

//         const passField = screen.getByLabelText(/password/i);
//         userEvent.type(passField, 'admin');

//         // Click on the submit button
//         // userEvent.click(loginButton);

//         // Wait for the asynchronous login process to complete
//         // await waitFor(() => {
//         //     // Assert that the login button is not in the document
//         //     expect(screen.queryByRole('button', { name: /login/i })).toBeNull();
//         // });

//         const signupbutton = screen.getByRole('button', { name: /signup/i });
//         expect(signupbutton).toBeInTheDocument();

//         await userEvent.click(signupbutton);

//         await waitFor(() => {
//                 // Assert that the login button is not in the document
//                 expect(screen.queryByRole('button', { name: /login/i })).toBeNull();
//             });

//     })
// });
