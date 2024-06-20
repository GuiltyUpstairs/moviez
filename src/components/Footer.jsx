import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: 2,
                mt: 'auto',
                textAlign: 'center',
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </Typography>
            <Link href="#" color="inherit" sx={{ ml: 1 }}>
                Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ ml: 1 }}>
                Terms of Service
            </Link>
        </Box>
    );
};

export default Footer;
