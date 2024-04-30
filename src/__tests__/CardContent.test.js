import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardContent from '../components/Shop/CardContent';
import axios from 'axios';

jest.mock('axios');

test.skip('renderCardContent', async () => {

    axios.post.mockResolvedValue({ data: true });

        // Mock the axios get request to simulate successful retrieval of rejected records
        axios.get.mockResolvedValue({ data: [
            {
                "ratingid": 19,
                "username": "krishna",
                "productsid": 25,
                "userrating": 5,
                "userreview": null
            }
        ] });

    render(<CardContent />,{
        wrapper: Router
    })

    const imgElement = screen.getByRole('heading')
    expect(imgElement).toBeInTheDocument();
})