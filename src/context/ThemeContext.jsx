import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [themeType, setThemeType] = useState('theme1');

    const themes = {
        theme1: {
            primary: '#4A90E2',
            secondary: '#D0021B',
            background: '#F5F5F5',
            paper: '#FFFFFF',
            text: '#000000',
        },
        theme2: {
            primary: '#7B4397',
            secondary: '#DC2430',
            background: '#EFEFEF',
            paper: '#FAFAFA',
            text: '#000000',
        },
        theme3: {
            primary: '#34A853',
            secondary: '#FBBC05',
            background: '#E0F7FA',
            paper: '#FFFFFF',
            text: '#000000',
        },
        theme4: {
            primary: '#FF7043',
            secondary: '#0288D1',
            background: '#FFF3E0',
            paper: '#FFFFFF',
            text: '#000000',
        },
    };

    const currentTheme = themes[themeType];

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: currentTheme.primary,
                    },
                    secondary: {
                        main: currentTheme.secondary,
                    },
                    background: {
                        default: currentTheme.background,
                        paper: currentTheme.paper,
                    },
                    text: {
                        primary: currentTheme.text,
                    },
                },
            }),
        [themeType]
    );

    const changeTheme = (newTheme) => {
        setThemeType(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ changeTheme, themeType }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
