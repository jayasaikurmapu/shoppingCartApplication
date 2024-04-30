import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import About from '../components/About/About';

test('renders About Screen', () => {
  render(<About />,{
    wrapper: Router
  });
  const linkElement = screen.getByText(/Capstone Store/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders about screen 2', () => {
    render(<About />,{
      wrapper: Router
    });
    const aboutElem = screen.getByText(/ics/i);
    expect(aboutElem).toBeInTheDocument();
  });
