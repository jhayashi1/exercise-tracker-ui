import {AppBar, Box, Button, Container, Drawer, Toolbar, Typography} from '@mui/material';
import type {FC} from 'react';
import {Link} from 'react-router-dom';
import {pages} from '../constants';

export const SideNav: FC = () => {
    return (
        <Drawer
            anchor="left"
            variant="permanent"
        >
            <Container maxWidth='xl' sx={{height: '100%'}}>
                <Toolbar />
                <Box sx={{overflow: 'auto'}}>
                    {Object.keys(pages).map((page) => (
                        <Button
                            disableRipple
                            component={Link}
                            key={page}
                            sx={{
                                display       : 'flex',
                                p             : '0.5rem',
                                color         : 'inherit',
                                justifyContent: 'center',
                                alignItems    : 'center',
                                transition    : 'color 0.2s ease-in-out',
                                '&:hover'     : {
                                    color: 'deepskyblue',
                                },
                            }}
                            to={pages[page]}
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
