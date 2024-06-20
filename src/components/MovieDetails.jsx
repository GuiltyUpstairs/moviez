// components/MovieDetails.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

const MovieDetails = ({ movie, onClose }) => {
    return (
        <Collapse in={Boolean(movie)}>
            <Card sx={{ width: 600, margin: 'auto', mt: 2 }}>
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
                <Button onClick={onClose} sx={{ m: 2 }}>Close</Button>
            </Card>
        </Collapse>
    );
};

export default MovieDetails;
