import React, { useState, useEffect } from 'react';
import '../styles/Card.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CardUI from './CardUI';

// const CardUI = ({ productimgurl, product, numOfCart, setNumOfCart, productname, productprice, stockavailable, id, category, className, adminRender, vendorRender }) => {

//   const addToCart = (card) => {
//     {
//       !(adminRender || vendorRender) && (
//         setNumOfCart(numOfCart + 1)
//       )
//     }
//     // console.log(card);
//     axios.post('http://localhost:8080/cart/save', card)
//       .then(response => {
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
//         console.log(response.data);
        
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   return (
//     <div className={className}>
//       <Card sx={{ width: '300px', height: '310px', boxShadow: 'lg', marginBottom: 10 }}>
//         <Link style={{ textDecoration: 'none' }} to={`/cardContent/${id}`} className="card-link">
//           <CardOverflow>
//             <AspectRatio sx={{ minWidth: '300px' }}>
//               <img
//                 src={productimgurl}
//                 srcSet={productimgurl}
//                 loading="lazy"
//                 alt=""
//                 className="card-image"
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
//                 className="card-title"
//               >
//                 {productname}
//               </Typography>
//               <ArrowOutwardIcon />
//             </Box>
//             <Typography
//               level="title-lg"
//               sx={{ mt: 1, fontWeight: 'xl' }}
//               endDecorator={
//                 <Chip component="span" size="sm" variant="soft" color="success">
//                   Lowest price
//                 </Chip>
//               }>
//               {productprice}
//             </Typography>
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

const SearchByCategory = ({ setCardNumber, mainUsername, adminRender, vendorRender, numOfCart, setNumOfCart, }) => {
  const [cardData, setCardData] = useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [loadingCategories, setLoadingCategories] = useState({}); // Track loading state for each category

  const handleClick = (inputValue) => {
    // Update loading state for the clicked category
    setLoadingCategories((prevLoadingCategories) => ({
      ...prevLoadingCategories,
      [inputValue]: true,
    }));

    const filtered = [];
    for (const product of cardData) {
      console.log(product.category);
      if (product.category === inputValue) {
        console.log(inputValue);
        filtered.push(product);
      }
    }
    setFilteredProducts(filtered);

    // Simulate loading for 1 second
    setTimeout(() => {
      // Revert loading state for the clicked category after 1 second
      setLoadingCategories((prevLoadingCategories) => ({
        ...prevLoadingCategories,
        [inputValue]: false,
      }));
    }, 500);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/all');
      const responseData = response.data.map(card => ({ ...card, username: mainUsername }));
      responseData.sort((a, b) => {
        if (a.productname < b.productname) {
          return -1;
        }
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

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    "All",
    "Fashion",
    "Electronics",
    "Home Appliances",
    "Food and Beverages",
    "Automotive",
    "Toys and Games",
    "Sports and Outdoors",
    "Books and Media",
    "Office Supplies",
    "Health and Beauty",
    "Garden"
  ];

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

  const formattedPrice = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
    return formattedPrice;
  };


  return (
    <div>
      <div className='searchByCategoryContainer'>
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
          {visibleCategories.map((category, index) => (
            <Button
              key={index}
              style={{ width: 'auto' }}
              variant="soft"
              onClick={() => handleClick(category)}
              disabled={loadingCategories[category]} // Disable the button if it's loading
              loading={loadingCategories[category]}
            >
              {category}
            </Button>
          ))}
          {!showAllCategories ? (
            <>
              <Tooltip arrow title="Expand">
                <Button style={{ width: 'auto' }} variant="soft" onClick={() => setShowAllCategories(true)}>
                  +
                </Button>
              </Tooltip>
            </>
          ) : (
            <Tooltip arrow title="Collapse">
              <Button style={{ width: 'auto' }} variant="soft" onClick={() => setShowAllCategories(false)}>
                -
              </Button>
            </Tooltip>
          )}
        </Box>
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
                productprice={formattedPrice(card.productprice)}
                category={card.category}
                setNumOfCart={setNumOfCart}
                numOfCart={numOfCart}
                product={card}
                stockavailable={card.stockavailable}
                onClick={() => handleCardClick(card.productsid)}
                adminRender={adminRender}
                vendorRender={vendorRender}
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
                setNumOfCart={setNumOfCart}
                numOfCart={numOfCart}
                productdesc={card.productdesc}
                productprice={formattedPrice(card.productprice)}
                stockavailable={card.stockavailable}
                onClick={() => handleCardClick(card.productsid)}
                adminRender={adminRender}
                vendorRender={vendorRender}
              />
            ))}
          </>
        )}

      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchByCategory;