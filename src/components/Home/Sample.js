import React from "react";
import { Link } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';

export default function Sample(props) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(price);
    };
    return (
        <Card sx={{ width: '300px', height: '310px', boxShadow: 'lg', marginBottom: 10, marginLeft: 5 }}>
            <Link style={{ textDecoration: 'none' }} to={`/cardContent/${props.id}`} className="card-link">
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: '300px' }}>
                        <img
                            src={props.url}
                            srcSet={props.url}
                            loading="lazy"
                            alt=""
                            className="card-image"
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent className="card-content">
                    <Typography level="body-xs">{props.category}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'row',
                        }}
                    >
                        <Typography
                            sx={{
                                mt: 1,
                                fontWeight: 'xl',
                                maxWidth: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                            className="card-title"
                        >
                            {props.name}
                        </Typography>
                        <ArrowOutwardIcon />
                    </Box>
                    <Typography
                        level="title-lg"
                        sx={{ mt: 1, fontWeight: 'xl' }}
                        endDecorator={
                            <Chip component="span" size="sm" variant="soft" color="success">
                                Lowest price
                            </Chip>
                        }>
                        {formatPrice(props.price)}
                    </Typography>
                    <Typography level="body-sm">
                        (Only <b>{props.stockavailable}</b> left in stock!)
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
