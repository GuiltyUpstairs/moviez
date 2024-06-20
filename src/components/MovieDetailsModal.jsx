import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Box, MenuItem, Select } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CloseIcon from '@mui/icons-material/Close';

const MovieDetailsModal = ({
                               movie,
                               open,
                               onClose,
                               movieLists,
                               onAddToList,
                               onRateMovie,
                               onToggleFavorite,
                               isFavorite,
                               onMarkAsWatched,
                               onAddToWatchlist,
                           }) => {
    const [selectedListIndex, setSelectedListIndex] = useState(0);

    if (!movie) return null;

    const handleAddToList = () => {
        onAddToList(movie, selectedListIndex);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {movie.title}
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ flex: 1, pr: { md: 2 }, pb: { xs: 2, md: 0 } }}>
                        <img src={movie.image} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            {movie.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Year: {movie.year}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Rating: {movie.rating}
                        </Typography>
                        <Select
                            value={selectedListIndex}
                            onChange={(e) => setSelectedListIndex(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 2 }}
                        >
                            {movieLists.map((list, index) => (
                                <MenuItem value={index} key={index}>
                                    {list.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <IconButton color="primary" onClick={() => onToggleFavorite(movie)}>
                    <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'} />
                </IconButton>
                <IconButton color="primary" onClick={() => onMarkAsWatched(movie)}>
                    <WatchLaterIcon />
                </IconButton>
                <Button onClick={handleAddToList} variant="contained" color="primary">
                    Add to List
                </Button>
                <Button onClick={() => onAddToWatchlist(movie)} variant="contained" color="primary">
                    Add to Watchlist
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MovieDetailsModal;
