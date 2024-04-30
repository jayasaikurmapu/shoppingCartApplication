import React from 'react';
import user from "@testing-library/user-event";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CardGrid from '../components/Shop/CardGrid';

describe.skip('Card Grid Component', () => {
    test('renders Card Grid Component', () => {
      render(<CardGrid mainUsername={'reddymasu'} adminRender={false} vendorRender={true}/>,{
        wrapper: Router
      });
      expect(screen.getByRole('button',{
        name: 'Search By Categories'
      })).toBeInTheDocument();
  
    });

    // test('getbyalt check', () => {
    //     render(<CardGrid mainUsername={'reddymasu'} adminRender={false} vendorRender={true}/>);
    //     expect(screen.getByAltText('product image')).toBeInTheDocument();
    // }) // prod.img no showing

    // test('user event check', async() => {
    //   user.setup()
    //   render(<CardGrid mainUsername={'reddymasu'} adminRender={false} vendorRender={true}/>,{
    //     wrapper: Router,
    //   })

        
    // })

    test.skip('datatestid check', () => {
        render(<CardGrid />,{
          wrapper: Router,
        });
        expect(screen.getByTestId('ArrowDropDownIcon')).toBeInTheDocument();
    })


  });