import {createTheme} from '@mui/material';

const primaryColor = '#121212';
const secondaryColor = '#181818';
const tertiaryColor = '#282828';

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
        // MuiDivider: createColorOverride('#303030'),
        // MuiCard   : {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: secondaryColor,
        //             borderColor    : tertiaryColor,
        //         },
        //     },
        // },
        // MuiTypography: {
        //     styleOverrides: {
        //         //@ts-ignore
        //         root: {
        //             fontWeight: 'normal',
        //             whiteSpace: 'pre-wrap',
        //             fontSize  : {
        //                 xs: '1rem',
        //                 md: '1.25rem',
        //                 lg: '1.5rem',
        //             },
        //         },
        //     },
        // },
    },
    typography: {
        fontFamily: 'Mulish',
    },
});
