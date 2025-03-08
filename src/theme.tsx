import {createTheme} from '@mui/material';

const primaryColor = '#181818';
const secondaryColor = '#262626';
const tertiaryColor = '#303030';
const tertiaryColorLight = '#323232';
export const DRAWER_WIDTH = '15vw';

const createColorOverride = (color: string): object => ({
    styleOverrides: {
        root: {
            backgroundColor: color,
        },
    },
});

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
        MuiDivider: createColorOverride('#303030'),
        MuiCard   : {
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
            styleOverrides: {
                root: {
                    color          : 'inherit',
                    backgroundColor: secondaryColor,
                    borderColor    : tertiaryColor,
                    '&:hover'      : {
                        backgroundColor: tertiaryColor,
                    },
                    justifyContent: 'center',
                    alignItems    : 'center',
                    p             : '0.5rem',
                },
            },
        },
    },
    typography: {
        fontFamily: 'Mulish',
    },
});
