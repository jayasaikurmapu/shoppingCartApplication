import user from "@testing-library/user-event";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Home from '../components/Home/Home';
import { createMemoryHistory } from "history";
import CardGrid from "../components/Shop/CardGrid";

test.skip('renders Home page', () => {
  render(<Home cardData={[]} />, {
    wrapper: Router
  });
  const linkElement = screen.getByText(/aim/i);
  expect(linkElement).toBeInTheDocument();
});

test.skip('renders headings correctly', () => {
  render(<Home cardData={[]} />, {
    wrapper: Router
  });
  const newCollectionHeading = screen.getByText('NEW COLLECTION');
  const capstoneStoreHeading = screen.getByText('CAPSTONE STORE');
  expect(newCollectionHeading).toBeInTheDocument();
  expect(capstoneStoreHeading).toBeInTheDocument();
});

test.skip('renders shop now button correctly', () => {
  render(<Home cardData={[]} />, {
    wrapper: Router
  });
  const shopNowButton = screen.getByRole('button', { name: /SHOP NOW/i });
  expect(shopNowButton).toBeInTheDocument();
});

test.skip('renders welcome paragraph correctly', () => {
  render(<Home cardData={[]} />, {
    wrapper: Router
  });
  const welcomeParagraph = screen.getByText(/Welcome to our capstone store,/i);
  expect(welcomeParagraph).toBeInTheDocument();

  const listElement = screen.getByRole('list');
  expect(listElement).toBeInTheDocument();
});

test('user event check', async () => {
  const historyMock = createMemoryHistory(["/", "/cardGrid"])
  render(
    <Router history={historyMock}>
      <Switch>
        <Route path='/home'><Home cardData={[{
          "productsid": 70,
          "productname": "Dyson V11 Torque Drive Cordless Vacuum Cleaner",
          "productprice": 59999,
          "productdesc": "High-performance cordless vacuum cleaner with powerful suction by Dyson.",
          "productimgurl": "https://m.media-amazon.com/images/I/61xW5y39hjL._AC_UF894,1000_QL80_.jpg",
          "stockavailable": 15,
          "vendorsno": 90,
          "rating": 1,
          "category": "Home Appliances"
        },
        {
          "productsid": 79,
          "productname": "Portable Tire Inflator",
          "productprice": 2199,
          "productdesc": "Qi-certified wireless charger compatible with most smartphones, designed for car use.",
          "productimgurl": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSn-dbMBaiufXIwh-zN_-z2HuEu7Iu_9K7oFv3wcq1w1MI9jHjhgIU397TZJidWlubbOVCygVyPs5e0yFyivIvXpH-xGsfDykSHgovb6E11dx9gzP5DgpbTW-HXWs-BsoFdJ9F5Epc&usqp=CAc",
          "stockavailable": 20,
          "vendorsno": 90,
          "rating": 1,
          "category": "Automotive"
        }]} /></Route>
        <Route path="/cardGrid" render={CardGrid} />
      </Switch>
    </Router>
  );
  // user.setup();
  // render(<Home cardData={cardData}/>,{
  //   wrapper: Router,
  // });

  const shopButton = screen.getByRole('button');
  expect(shopButton).toBeInTheDocument();

  await userEvent.click(shopButton);
  const searchcategoryButton = screen.getByRole('buttons');
  expect(searchcategoryButton).toBeInTheDocument();

  // expect(screen.queryByRole('button', { name: /login/i })).toBeNull();

  // await act(async () => { // Wrap the code inside act
  //   user.click(shopButton);
  // });

  // const searchcategoryButton = screen.getByRole('button', {  name: /search by categories/i});
  // expect(searchcategoryButton).toBeInTheDocument();
})

//   test('renders carousel correctly', () => {
//     render(<Home cardData={cardData} />);
//     const carousel = screen.getByTestId('react-multi-carousel-list');
//     expect(carousel).toBeInTheDocument();
//   });
