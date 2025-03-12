import {Box, Button, Container, Drawer, Typography} from '@mui/material';
import type {FC} from 'react';
import {pages} from '../constants';
import {Link} from 'react-router-dom';
import type {CognitoAuthProps} from '../https/types';
import {useAuth} from 'react-oidc-context';

export const DRAWER_WIDTH = '15vw';
const SIDE_NAV_COLOR = '#1b232d';
const SIDE_NAV_COLOR_LIGHT = '#232e3b';

export const SideNav: FC = () => {
    const auth = useAuth() as CognitoAuthProps;
    const username = auth.user?.profile['cognito:username'] ?? '';

    return (
        <Drawer
            anchor="left"
            sx={{
                width               : DRAWER_WIDTH,
                flexShrink          : 0,
                '& .MuiDrawer-paper': {
                    width          : DRAWER_WIDTH,
                    boxSizing      : 'border-box',
                    backgroundColor: SIDE_NAV_COLOR,
                },
            }}
            variant="permanent"
        >
            <Container sx={{height: '100%'}}>
                <Box sx={{overflow: 'auto', mt: '2rem'}}>
                    <Box
                        sx={{
                            display       : 'flex',
                            justifyContent: 'center',
                            alignItems    : 'center',
                            mb            : '2rem',
                        }}
                    >
                        <Typography
                            sx={{textTransform: 'none'}}
                            variant='h5'
                        >
                            {`Hello ${username}`}
                        </Typography>
                    </Box>
                    {Object.keys(pages).map((page) => (
                        <Button
                            component={Link}
                            key={page}
                            sx={{
                                backgroundColor: 'transparent',
                                display        : 'flex',
                                mt             : '3rem',
                                '&:hover'      : {
                                    backgroundColor: SIDE_NAV_COLOR_LIGHT,
                                },
                            }}
                            to = {pages[page]}
                        >
                            <Typography
                                noWrap
                                sx={{fontWeight: 'semibold', textTransform: 'none'}}
                                variant="h6"
                            >
                                {page}
                            </Typography>
                        </Button>
                    ))}
                </Box>
            </Container>
        </Drawer>
    );
};
