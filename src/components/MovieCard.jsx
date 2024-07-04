import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardActionArea } from '@mui/material';

const MovieCard = ({ movie, onAddClick }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardActionArea onClick={() => onAddClick(movie)}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.image}
                    alt={movie.title}
                    sx={{ objectFit: 'cover', width: '100%', height: '450px' }} // Ensuring fixed size
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton color="primary" onClick={() => onAddClick(movie)}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onAddClick(movie)}>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
