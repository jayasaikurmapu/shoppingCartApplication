import React, { useState, useEffect } from 'react';
import '../styles/Card.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarIcon from '@mui/icons-material/Star';
import CardUI from './CardUI';


// const CardUI = ({ productimgurl, product, numOfCart, setNumOfCart, productname, productprice, stockavailable, id, category, rating, adminRender, vendorRender }) => {
//   const addToCart = (card) => {
//     {
//       !(adminRender || vendorRender) && (
//         setNumOfCart(numOfCart + 1)
//       )
//     }
//     axios.post('http://localhost:8080/cart/save', card)
//       .then(response => {
//         console.log(response.data);
//         console.log('Response status code:', response.status);
//         toast.success('Product Added to Cart', {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//   }

//   return (
//     <div>
//       <Card sx={{ width: '300px', height: '310px', boxShadow: 'lg', marginBottom: 10 }}>
//         <Link style={{ textDecoration: 'none' }} to={`/cardContent/${id}`} className="card-link">
//           <CardOverflow>
//             <AspectRatio sx={{ minWidth: '300px' }}>
//               <img
//                 src={productimgurl}
//                 srcSet={productimgurl}
//                 loading="lazy"
//                 alt=""
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className="card-content">
//             <Typography level="body-xs">{category}</Typography>
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: 1,
//                 flexDirection: 'row',
//               }}
//             >
//               <Typography
//                 sx={{
//                   mt: 1,
//                   fontWeight: 'xl',
//                   maxWidth: '100%',
//                   overflow: 'hidden',
//                   whiteSpace: 'nowrap',
//                   textOverflow: 'ellipsis',
//                 }}
//               >
//                 {productname}
//               </Typography>
//               <ArrowOutwardIcon />
//             </Box>
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: 1,
//                 flexDirection: 'row',
//               }}
//             >
//               <Typography
//                 level="title-lg"
//                 sx={{ mt: 1, fontWeight: 'xl' }}
//                 endDecorator={
//                   <Chip component="span" size="sm" variant="soft" color="success">
//                     Lowest price
//                   </Chip>
//                 }>
//                 {productprice}
//               </Typography>
//               <Typography sx={{ display: 'flex', alignItems: 'center', mt: 1, fontWeight: 'xl' }}>
//                 {rating}
//                 <StarIcon sx={{ color: 'orange', fontSize: 20 }} />/5
//               </Typography>

//             </Box>
//             <Typography level="body-sm">
//               (Only <b>{stockavailable}</b> left in stock!)
//             </Typography>
//           </CardContent>
//         </Link>
//         <CardOverflow>
//           {!(adminRender || vendorRender) && (
//             <Button variant="solid" color="danger" size="lg" onClick={() => addToCart(product)}>
//               Add to cart
//             </Button>
//           )}
//         </CardOverflow>
//       </Card>
//     </div>
//   );
// };

const CardGrid = ({ setCardNumber, setNumOfCart, numOfCart, mainUsername, adminRender, vendorRender }) => {
  const [cardData, setCardData] = useState([]);
  const [value, setValue] = React.useState(cardData[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const handleSearch = (inputValue) => {
    const filtered = [];
    for (const product of cardData) {
      console.log(product.productname.toLowerCase().includes(inputValue.toLowerCase()))
      if (product.productname.toLowerCase().includes(inputValue.toLowerCase())) {
        filtered.push(product);
      }
    }
    setFilteredProducts(filtered);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/all');
      const responseData = response.data.map(card => ({ ...card, username: mainUsername }));
      responseData.sort((a, b) => {
        if (a.productname < b.productname) { return -1; }
        if (a.productname > b.productname) {
          return 1;
        }
        return 0;
      });
      setCardData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setNumOfCart(numOfCart)
    fetchData();
  }, []);

  const [selectedOption, setSelectedOption] = useState('Option 1');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case 'Option 1':
        functionForOption1();
        break;
      case 'Option 2':
        functionForOption2();
        break;
      case 'Option 3':
        functionForOption3();
        break;
      case 'Option 4':
        functionForOption4();
        break;
      case 'Option 5':
        functionForOption5();
        break;
      default:
        break;
    }
  };

  const functionForOption1 = () => {
    cardData.sort((a, b) => {
      if (a.productname < b.productname) {
        return -1;
      }
      if (a.productname > b.productname) {
        return 1;
      }
      return 0;
    });
    console.log(cardData);
  };

  const functionForOption2 = () => {
    cardData.sort((a, b) => a.productprice - b.productprice);
    console.log(cardData)
  };

  const functionForOption3 = () => {
    cardData.sort((a, b) => b.productprice - a.productprice);
  };

  const functionForOption4 = () => {
    cardData.sort((a, b) => a.stockavailable - b.stockavailable);
  };

  const functionForOption5 = () => {
    cardData.sort((a, b) => b.rating - a.rating);
  };

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    setCardNumber(selectedCardIndex);
  }, [selectedCardIndex, setCardNumber]);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formattedPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
    return formattedPrice;
  };


  return (
    <div>
      <div style={{ paddingBottom: 10, paddingTop: 15 }}>
        <FormControl id="controllable-states-demo">
          <Box
            sx={{
              display: 'flex',
              marginLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Autocomplete
              placeholder="Search..."
              sx={{ width: 600, textAlign: 'center', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
              options={cardData}
              getOptionLabel={(option) => option.productname}
              renderOption={(props, option) => (
                <AutocompleteOption {...props}>
                  <ListItemDecorator>
                    <img
                      loading="lazy"
                      width="50"
                      height="50"
                      srcSet={option.productimgurl}
                      src={option.productimgurl}
                      alt=""
                    />
                  </ListItemDecorator>
                  <ListItemContent sx={{ fontSize: 'sm', marginLeft: 3 }}>
                    {option.productname}
                  </ListItemContent>
                </AutocompleteOption>
              )}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                handleSearch(newInputValue);
              }}
            />

            <Link to='/searchcategory'>
              <Button style={{ width: 100 }} variant="solid">
                Categories
              </Button>
            </Link>

            <div style={{ marginLeft: 1 }}>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                style={{
                  padding: '8px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#333',
                  outline: 'none', // Remove outline on focus
                }}
              >
                <option value="Option 1">Sort by Name (Alphabetical Order)</option>
                <option value="Option 2">Sort By Price (Low to High)</option>
                <option value="Option 3">Sort By Price (High to Low)</option>
                <option value="Option 4">Sort By Stock available</option>
                <option value="Option 5">Sort By Product Rating</option>
              </select>
            </div>

          </Box>

        </FormControl>
      </div>


      <div className="card-row">
        {filteredProducts.length !== 0 ? (
          <>
            {filteredProducts.map((card) => (
              <CardUI
                key={card.productsid}
                className="CardUI"
                id={card.productsid}
                productimgurl={card.productimgurl}
                productname={card.productname}
                productdesc={card.productdesc}
                adminRender={adminRender}
                vendorRender={vendorRender}
                setNumOfCart={setNumOfCart}
                numOfCart={numOfCart}
                rating={card.rating}
                productprice={formattedPrice(card.productprice)}
                category={card.category}
                product={card}
                stockavailable={card.stockavailable}
                onClick={() => handleCardClick(card.productsid)}
              />
            ))}
          </>
        ) : (
          <>
            {cardData.map((card) => (
              <CardUI
                key={card.productsid}
                className="CardUI"
                id={card.productsid}
                product={card}
                productimgurl={card.productimgurl}
                productname={card.productname}
                category={card.category}
                adminRender={adminRender}
                vendorRender={vendorRender}
                rating={card.rating}
                setNumOfCart={setNumOfCart}
                numOfCart={numOfCart}
                productdesc={card.productdesc}
                productprice={formattedPrice(card.productprice)}
                stockavailable={card.stockavailable}
                onClick={() => handleCardClick(card.productsid)}
              />
            ))}
          </>
        )}

      </div>
      <ToastContainer />
    </div>
  );
};

export default CardGrid;