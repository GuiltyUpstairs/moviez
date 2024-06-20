import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

const Sidebar = ({ movieLists, onCreateList, onSelectList, onSelectFavorites, onSelectWatchlist }) => {
    const [newListName, setNewListName] = useState('');

    const handleCreateList = () => {
        if (newListName.trim()) {
            onCreateList(newListName);
            setNewListName('');
        }
    };

    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                bgcolor: 'background.paper',
                boxShadow: 3,
                p: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Movie Lists
            </Typography>
            <List>
                <ListItem button onClick={onSelectFavorites}>
                    <FavoriteIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Favorite Movies" />
                </ListItem>
                <ListItem button onClick={onSelectWatchlist}>
                    <WatchLaterIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Watchlist" />
                </ListItem>
                {movieLists.map((list, index) => (
                    <ListItem button key={index} onClick={() => onSelectList(index)}>
                        <PlaylistPlayIcon sx={{ mr: 2 }} />
                        <ListItemText primary={list.name} />
                    </ListItem>
                ))}
            </List>
            <TextField
                label="New List Name"
                variant="outlined"
                size="small"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                sx={{ mt: 2, borderRadius: 1 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateList}
                sx={{ mt: 2, borderRadius: 1 }}
            >
                <PlaylistAddIcon sx={{ mr: 1 }} />
                Create New List
            </Button>
        </Box>
    );
};

export default Sidebar;
