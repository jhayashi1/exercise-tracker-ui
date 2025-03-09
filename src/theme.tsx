import {createTheme} from '@mui/material';
const primaryColor = '#181818';
const secondaryColor = '#363636';
const tertiaryColor = '#404040';
const tertiaryColorLight = '#404040';
export const DRAWER_WIDTH = '15vw';

export const theme = createTheme({
    palette: {
        primary: {
            main        : primaryColor,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main        : secondaryColor,
            contrastText: '#FFFFFF',
        },
        background: {
            default: primaryColor,
            paper  : primaryColor,
        },
        text: {
            primary  : '#FFFFFF',
            secondary: '#b3b3b3',
        },
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: secondaryColor,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderColor: tertiaryColor,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                //@ts-ignore
                root: {
                    fontWeight  : 'normal',
                    whiteSpace  : 'pre-wrap',
                    wordWrap    : 'break-word',
                    overflowWrap: 'break-word',
                    fontSize    : {
                        xs: '1rem',
                        md: '1.25rem',
                        lg: '1.5rem',
                    },
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl',
            },
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    color   : 'white',
                    variants: [
                        {
                            props: {variant: 'outlined'},
                            style: {
                                backgroundColor: secondaryColor,
                                borderColor    : tertiaryColor,
                                '&:hover'      : {
                                    backgroundColor: tertiaryColor,
                                    BorderColor    : tertiaryColorLight,
                                },
                                justifyContent: 'center',
                                alignItems    : 'center',
                                p             : '0.5rem',
                            },
                        },
                    ],
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                InputProps: {
                    sx: {
                        '& fieldset'            : {borderColor: tertiaryColor},
                        '&:hover fieldset'      : {borderColor: 'white'},
                        '&.Mui-focused fieldset': {borderColor: 'white !important'},
                    },
                },
                InputLabelProps: {
                    sx: {
                        '&.Mui-focused': {
                            color: 'white',
                        },
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: 'Mulish',
    },
});
