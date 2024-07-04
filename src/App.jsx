import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MovieDetailsModal from './components/MovieDetailsModal';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ResultsCount from './components/ResultsCount'; // Import ResultsCount
import { Box, Container, Typography, Grid } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import axios from 'axios';
import MovieCard from './components/MovieCard.jsx';
import { motion } from 'framer-motion';
import './App.css';

const VIEW_TYPES = {
    SEARCH_RESULTS: 'SEARCH_RESULTS',
    FAVORITES: 'FAVORITES',
    WATCHLIST: 'WATCHLIST',
    CUSTOM_LIST: 'CUSTOM_LIST',
};

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [movieLists, setMovieLists] = useState([{ name: 'Default List', movies: [] }]);
    const [selectedListIndex, setSelectedListIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [movieRatings, setMovieRatings] = useState({});
    const [viewType, setViewType] = useState(VIEW_TYPES.SEARCH_RESULTS);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setViewType(VIEW_TYPES.SEARCH_RESULTS);
    };

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                const res = await axios.get(`http://www.omdbapi.com/?apikey=21c70ffa&s=${searchQuery}`, { signal: controller.signal });
                const data = await res.data;

                if (data.Response === 'True') {
                    const formattedMovies = data.Search.slice(0, 18).map((movie) => ({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        description: movie.Type,
                        year: movie.Year,
                        image:
                            movie.Poster !== 'N/A'
                                ? movie.Poster
                                : 'https://via.placeholder.com/300x450?text=No+Image',
                        rating: movie.imdbRating || 'N/A',
                    }));
                    setFilteredMovies(formattedMovies);
                } else {
                    setFilteredMovies([]);
                }
            } catch (err) {
                if (err.name !== 'CanceledError') {
                    console.log(err.message);
                }
            }
        }

        if (searchQuery.length < 3) {
            setFilteredMovies([]);
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [searchQuery]);

    const fetchMovieDetails = async (imdbID) => {
        try {
            const res = await axios.get(`http://www.omdbapi.com/?apikey=21c70ffa&i=${imdbID}`);
            return res.data;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    };

    const handleAddClick = async (movie) => {
        const fullMovieDetails = await fetchMovieDetails(movie.imdbID);
        setSelectedMovie(fullMovieDetails);
        setModalOpen(true);
    };

    const handleAddToList = (movie, listIndex) => {
        const updatedMovieLists = [...movieLists];
        const list = updatedMovieLists[listIndex];
        if (!list.movies.some((m) => m.imdbID === movie.imdbID)) {
            list.movies.push(movie);
            setMovieLists(updatedMovieLists);
            alert(`Added to ${list.name}!`);
        } else {
            alert(`Movie is already in ${list.name}!`);
        }
    };

    const handleCreateList = (listName) => {
        setMovieLists([...movieLists, { name: listName, movies: [] }]);
    };

    const handleSelectList = (index) => {
        setSelectedListIndex(index);
        setViewType(VIEW_TYPES.CUSTOM_LIST);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    const handleRateMovie = (movie, rating) => {
        setMovieRatings({ ...movieRatings, [movie.imdbID]: rating });
    };

    const handleToggleFavorite = (movie) => {
        const isAlreadyFavorite = favoriteMovies.some((fav) => fav.imdbID === movie.imdbID);
        if (isAlreadyFavorite) {
            setFavoriteMovies(favoriteMovies.filter((fav) => fav.imdbID !== movie.imdbID));
        } else {
            setFavoriteMovies([...favoriteMovies, movie]);
        }
    };

    const handleMarkAsWatched = (movie) => {
        if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
            setWatchlist([...watchlist, movie]);
            alert('Marked as watched!');
        }
        handleCloseModal();
    };

    const handleAddToWatchlist = (movie) => {
        const isAlreadyInWatchlist = watchlist.some((watch) => watch.imdbID === movie.imdbID);
        if (!isAlreadyInWatchlist) {
            setWatchlist([...watchlist, movie]);
            alert('Added to watchlist!');
        }
    };

    const isFavorite = (movie) => {
        return favoriteMovies.some((fav) => fav.imdbID === movie.imdbID);
    };

    const handleSelectFavorites = () => {
        setViewType(VIEW_TYPES.FAVORITES);
    };

    const handleSelectWatchlist = () => {
        setViewType(VIEW_TYPES.WATCHLIST);
    };

    const renderMovies = (movies) => {
        if (movies.length === 0) {
            return (
                <Typography variant="body1" sx={{ mt: 4 }}>
                    This list is empty.
                </Typography>
            );
        }

        return (
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                        <MovieCard movie={movie} onAddClick={handleAddClick} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    const renderContent = () => {
        switch (viewType) {
            case VIEW_TYPES.SEARCH_RESULTS:
                return (
                    <>
                        {searchQuery.length >= 3 && <ResultsCount count={filteredMovies.length} />}
                        {renderMovies(filteredMovies)}
                    </>
                );
            case VIEW_TYPES.FAVORITES:
                return (
                    <>
                        <Typography variant="h6" sx={{ mt: 4 }}>
                            Favorite Movies
                        </Typography>
                        {renderMovies(favoriteMovies)}
                    </>
                );
            case VIEW_TYPES.WATCHLIST:
                return (
                    <>
                        <Typography variant="h6" sx={{ mt: 4 }}>
                            Watchlist
                        </Typography>
                        {renderMovies(watchlist)}
                    </>
                );
            case VIEW_TYPES.CUSTOM_LIST:
                return (
                    <>
                        <Typography variant="h6" sx={{ mt: 4 }}>
                            {movieLists[selectedListIndex].name}
                        </Typography>
                        {renderMovies(movieLists[selectedListIndex].movies)}
                    </>
                );
            default:
                return null;
        }
    };

    return (

        <ThemeProvider>
            <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route
                            path="*"
                            element={
                                <>
                                    <NavBar searchQuery={searchQuery} handleSearch={handleSearch} isLoggedIn={isLoggedIn} />
                                    <Box sx={{ display: 'flex', flex: 1 }}>
                                        <Sidebar
                                            movieLists={movieLists}
                                            onCreateList={handleCreateList}
                                            onSelectList={handleSelectList}
                                            onSelectFavorites={handleSelectFavorites}
                                            onSelectWatchlist={handleSelectWatchlist}
                                        />
                                        <Container sx={{ flex: 1, py: 4, backgroundColor: 'background.default' }}>{renderContent()}</Container>
                                    </Box>
                                    <Footer />
                                    {selectedMovie && (
                                        <MovieDetailsModal
                                            movie={{ ...selectedMovie, userRating: movieRatings[selectedMovie.imdbID] }}
                                            open={modalOpen}
                                            onClose={handleCloseModal}
                                            movieLists={movieLists}
                                            onAddToList={handleAddToList}
                                            onRateMovie={handleRateMovie}
                                            onToggleFavorite={handleToggleFavorite}
                                            isFavorite={isFavorite(selectedMovie)}
                                            onMarkAsWatched={handleMarkAsWatched}
                                            onAddToWatchlist={handleAddToWatchlist}
                                        />
                                    )}
                                </>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
