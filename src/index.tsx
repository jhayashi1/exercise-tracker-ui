import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from './routes';
import {theme} from './theme';
import {Box, Container, Paper} from '@mui/material';
import {AuthProvider} from 'react-oidc-context';

const cognitoAuthConfig = {
    authority    : 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GF38zyZr1',
    client_id    : '2noitmshfthr2ha1s1amr8iafp',
    redirect_uri : 'http://localhost:8080',
    response_type: 'code',
    scope        : 'openid',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Paper sx={{borderRadius: 0, flex: 1, minHeight: '100vh'}}>
                        <Box sx={{pt: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                            <Container maxWidth='lg'>
                                <Routes>
                                    {routes}
                                </Routes>
                            </Container>
                        </Box>
                    </Paper>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);
