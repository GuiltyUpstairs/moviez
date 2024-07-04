import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../context/ThemeContext';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const NavBar = ({ searchQuery, handleSearch, isLoggedIn, onLogout }) => {
    const { changeTheme, themeType } = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [themeAnchorEl, setThemeAnchorEl] = React.useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleThemeMenuOpen = (event) => {
        setThemeAnchorEl(event.currentTarget);
    };

    const handleThemeMenuClose = () => {
        setThemeAnchorEl(null);
    };

    const handleThemeChange = (newTheme) => {
        changeTheme(newTheme);
        handleThemeMenuClose();
    };

    const handleLogout = () => {
        onLogout();
        handleMenuClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
                        MyApp
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </Search>
                    <IconButton color="inherit" onClick={handleThemeMenuOpen}>
                        <PaletteIcon />
                    </IconButton>
                    <Menu
                        anchorEl={themeAnchorEl}
                        open={Boolean(themeAnchorEl)}
                        onClose={handleThemeMenuClose}
                    >
                        <MenuItem onClick={() => handleThemeChange('theme1')}>Theme 1</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('theme2')}>Theme 2</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('theme3')}>Theme 3</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('theme4')}>Theme 4</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('theme5')}>Theme 5</MenuItem>
                        <MenuItem onClick={() => handleThemeChange('theme6')}>Theme 6</MenuItem>
                    </Menu>
                    {isLoggedIn ? (
                        <>
                            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ ml: 2, width: 48, height: 48 }} onClick={handleAvatarClick} />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        mt: 1.5,
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                            <Button component={Link} to="/login" variant="contained" color="secondary">
                                Login
                            </Button>
                            <Button component={Link} to="/signup" variant="outlined" color="secondary">
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;

