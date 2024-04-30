import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

const RatingStars = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1); // Adding 1 to starIndex to make it 1-based
  };

  const resetRating = () => {
    setRating(0);
  };

  const submitRating = () => {
    onRate(rating); // Passing the selected rating to the parent component
    resetRating(); // Resetting the rating after submission
  };

  return (
    <div>
      <Box sx={{ display: 'flex', paddingRight: 55, alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            onClick={() => handleStarClick(index)}
            color={index < rating ? '#ffc107' : '#e4e5e9'}
            style={{ cursor: 'pointer', marginRight: '12px', fontSize: '26px' }}
          />
        ))}
        <Button
          style={{ width: 90 }}
          variant="soft"
          color="success"
          onClick={submitRating}
        >
          Rate
        </Button>
      </Box>
    </div>
  );
};

export default RatingStars;
