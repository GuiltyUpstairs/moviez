import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MovieDetailsDialog = ({ movie, open, onClose }) => {
    if (!movie) return null;

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="movie-dialog-title">
            <DialogTitle id="movie-dialog-title">{movie.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        {movie.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Release Date: {movie.releaseDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Rating: {movie.rating}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MovieDetailsDialog;
