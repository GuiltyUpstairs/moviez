import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, CardActions, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MovieCard = ({ movie, onAddClick }) => {
    return (
        <Card sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                sx={{ height: 320, width: '100%', objectFit: 'cover' }}
                image={movie.image}
                alt={movie.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    Release Date: {movie.year}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    Rating: {movie.rating}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="large" color="primary" onClick={() => onAddClick(movie)}>
                    <AddIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default MovieCard;
