import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/CardContent.css';
import { successToast, warningToast, errorToast, infoToast } from '../toastHelper';

const CardContent = ({ mainUsername, adminRender, vendorRender }) => {
  const { index } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cardData, setCardData] = useState([]);
  const [submittedRating, setSubmittedRating] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [indianPrice, setIndianPrice] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/all');
      const responseData = response.data.map(card => ({ ...card, username: mainUsername }));
      setCardData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rating/all?username=${mainUsername}`);
        const ratingsMap = {};

        const userRatings = response.data.filter(rating => rating.username === mainUsername);

        userRatings.forEach(rating => {
          ratingsMap[rating.productsid] = rating.userrating;
        });

        setUserRatings(ratingsMap);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserRatings();
  }, [mainUsername]);


  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };

  const formattedPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
    return formattedPrice;
  };

  const card = cardData.find((card) => card.productsid === parseInt(index));

  useEffect(() => {
    if (card) {
      setIndianPrice(formattedPrice(card.productprice));
    }
  }, [card]);

  if (!card) {
    return <div>Loading...</div>;
  }

  const addToCart = (card, quantity) => {
    for (let i = 0; i < quantity; i++) {
      axios.post('http://localhost:8080/cart/save', card)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    successToast('Product Added to Cart');
  }

  const submitRating = (rating) => {
    if (userRatings[card.productsid] !== undefined) {
      return;
    }

    const aggregateRating = ((card.rating + rating) / 2).toFixed(1);

    axios.put('http://localhost:8080/products/rate', {
      id: card.productsid,
      rating: aggregateRating,
    })
      .then(response => {
        console.log(response.status);
        successToast('Review Submitted Successfully');
        setSubmittedRating(rating);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    axios.post('http://localhost:8080/rating/save', {
      username: mainUsername,
      productsid: card.productsid,
      userrating: rating,
    })
      .then(response => {
        console.log(response.status);
        setUserRatings(prevState => ({
          ...prevState,
          [card.productsid]: rating,
        }));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div>
        <Link to='/cardGrid'>
          <ArrowBackIcon sx={{ fontSize: 40, margin: 1 }} />
        </Link>

        <div className='cardContentContainer'>

          <img src={card.productimgurl} width={300} alt="Card" className='cardContentproductImg' />

          <div >
            <h2 className='cardContentproductName'>{card.productname}</h2>
            <h3 className='cardContentFont'>{indianPrice}</h3>

            <p className='cardContentFont'>{card.productdesc}</p>

            <div style={{ marginBottom: 10 }}>
              <p className='cardContentFont'>Stock available: {card.stockavailable}</p>
            </div>

            <div style={{ marginBottom: 10 }}>
              <Box sx={{ display: 'flex', paddingRight: 50, alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>

                <ButtonGroup variant="soft" aria-label="tooltip button group">
                  <Tooltip arrow title="Decrease">
                    <Button style={{ width: 3 }} variant="soft" onClick={decreaseQuantity}>
                      <RemoveIcon />
                    </Button>
                  </Tooltip>
                  <span>
                    <IconButton style={{ width: 3 }} disabled>
                      {quantity}
                    </IconButton>
                  </span>
                  <Tooltip arrow title="Increase">
                    <Button style={{ width: 3 }} variant="soft" onClick={increaseQuantity}>
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>

                {!(adminRender || vendorRender) && (
                  <Button
                    style={{ width: 150, fontFamily: 'robotoRegular' }}
                    // variant="soft"
                    color="success"
                    onClick={() => addToCart(card, quantity)}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </div>
          </div>
        </div>

        <div className='cardContentRating'>
          <div className='rateStyle'>
            {!(adminRender || vendorRender) && (
              <div>
                {userRatings[card.productsid] === undefined && <RatingStars onRate={submitRating} />}
              </div>
            )}

            <h3 className='rateHeading'>This Product Is Rated {card.rating} / 5 </h3>
            <div>
              {(userRatings[card.productsid] !== undefined) && <p style={{ paddingLeft: 70 }}>Your Rating: {userRatings[card.productsid]}/5</p>}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CardContent;
