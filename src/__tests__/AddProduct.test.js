import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AddProduct from '../components/ProductConfig/AddProduct';

describe('AddProduct Component', () => {
  test('renders Add Product form', () => {
    render(<AddProduct />);
    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product image Url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stock Available/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Product/i })).toBeInTheDocument();

  });

  test('input fields accept user input', () => {
    render(<AddProduct />);
    
    // Simulate user input for each input field
    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Product Price/i), { target: { value: '10.99' } });
    fireEvent.change(screen.getByLabelText(/Product Description/i), { target: { value: 'This is a test product.' } });
    fireEvent.change(screen.getByLabelText(/Product image Url/i), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(screen.getByLabelText(/Stock Available/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Test Category' } });

    // Assert that the input fields contain the correct values
    expect(screen.getByLabelText(/Product Name/i)).toHaveValue('Test Product');
    expect(screen.getByLabelText(/Product Price/i)).toHaveValue('10.99');
    expect(screen.getByLabelText(/Product Description/i)).toHaveValue('This is a test product.');
    expect(screen.getByLabelText(/Product image Url/i)).toHaveValue('https://example.com/image.jpg');
    expect(screen.getByLabelText(/Stock Available/i)).toHaveValue('100');
    expect(screen.getByLabelText(/Category/i)).toHaveValue('Test Category');
  });

  test('submit button present or not', () => {
    render(<AddProduct />);
    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
  })

  test('checks', () => {
    render(<AddProduct />);
    const inputElement1 = screen.getByRole('textbox',{
      name: /Product name/i,
    });
    expect(inputElement1).toBeInTheDocument();

    const inputElement2 = screen.getByRole('textbox',{
      name: 'Stock Available',
    });
    expect(inputElement2).toBeInTheDocument();

    const headingElement = screen.getByRole('heading',{
      name: 'Add a new Product',
    });
    expect(headingElement).toBeInTheDocument();

    const headingElementNewWay = screen.getByRole('heading',{
      level: 3, // h3 = level 3
    });
    expect(headingElementNewWay).toBeInTheDocument();

    const checkLabel = screen.getByLabelText(/Product price/i);
    expect(checkLabel).toBeInTheDocument();

    const checkLabel2 = screen.getByLabelText(/category/i);
    expect(checkLabel2).toBeInTheDocument();

    // const checkPlaceHolder = screen.getByPlaceholderText(/Stock Available/i);
    // expect(checkPlaceHolder).toBeInTheDocument();  -- wrong

    const textCheck = screen.getByText(/add a new produc/i);
    expect(textCheck).toBeInTheDocument();

    const textCheck2 = screen.getByText(/add prod/i);
    expect(textCheck2).toBeInTheDocument();

    const textCheck3 = screen.getByText('Product image Url');
    expect(textCheck3).toBeInTheDocument();

    // const valueCheck = screen.getByDisplayValue('productdesc');
    // expect(valueCheck).toBeInTheDocument(); // check later
  })

});
