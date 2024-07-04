import React from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Rating,
} from '@mui/material';
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
    const [selectedListIndex, setSelectedListIndex] = React.useState(0);

    const handleListChange = (event) => {
        setSelectedListIndex(event.target.value);
    };

    const handleAddToSelectedList = () => {
        onAddToList(movie, selectedListIndex);
    };

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Genre: genre,
        Director: director,
        Actors: actors,
        Released: released,
    } = movie;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="row" gap={3}>
                    <Box sx={{ flex: '1 1 0', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={poster}
                            alt={title}
                            style={{ width: '100%', height: 'auto', maxWidth: '300px', borderRadius: '8px' }} // Better size for image
                        />
                    </Box>
                    <Box sx={{ flex: '2 1 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {plot}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Year: {year}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Released: {released}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Runtime: {runtime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Genre: {genre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Director: {director}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Actors: {actors}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            IMDb Rating: {imdbRating}
                        </Typography>
                        <Rating
                            name="user-rating"
                            value={movie.userRating || 0}
                            onChange={(event, newValue) => onRateMovie(movie, newValue)}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <FormControl fullWidth>
                    <InputLabel id="select-list-label">Select List</InputLabel>
                    <Select
                        labelId="select-list-label"
                        value={selectedListIndex}
                        label="Select List"
                        onChange={handleListChange}
                    >
                        {movieLists.map((list, index) => (
                            <MenuItem key={index} value={index}>
                                {list.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button onClick={handleAddToSelectedList}>Add to List</Button>
                </FormControl>
                <IconButton onClick={() => onToggleFavorite(movie)} color={isFavorite ? 'error' : 'default'}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton onClick={() => onAddToWatchlist(movie)}>
                    <WatchLaterIcon />
                </IconButton>
                <Button onClick={() => onMarkAsWatched(movie)}>Mark as Watched</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MovieDetailsModal;
