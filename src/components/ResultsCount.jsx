import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ResultsCount = ({ count }) => {
    return (
        <Box sx={{ my: 2 }}>
            <Typography variant="h6" color="textPrimary">
                {`Found ${count} result${count !== 1 ? 's' : ''}`}
            </Typography>
        </Box>
    );
};

export default ResultsCount;
