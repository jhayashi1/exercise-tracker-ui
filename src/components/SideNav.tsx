import {Box, Button, Container, Drawer, Typography} from '@mui/material';
import type {FC} from 'react';
import {pages} from '../constants';
import {Link} from 'react-router-dom';

export const DRAWER_WIDTH = '15vw';
const SIDE_NAV_COLOR = '#1b232d';
const SIDE_NAV_COLOR_LIGHT = '#232e3b';

export const SideNav: FC = () => {
    return (
        <Drawer
            anchor="left"
            sx={{
                width               : DRAWER_WIDTH,
                flexShrink          : 0,
                '& .MuiDrawer-paper': {
                    width          : DRAWER_WIDTH,
                    boxSizing      : 'border-box',
                    backgroundColor: `${SIDE_NAV_COLOR}`,
                },
            }}
            variant="permanent"
        >
            <Container sx={{height: '100%'}}>
                <Box sx={{overflow: 'auto', mt: '2rem'}}>
                    {Object.keys(pages).map((page) => (
                        <Button
                            disableRipple
                            component={Link}
                            key= {page}
                            sx={{
                                backgroundColor: 'transparent',
                                display        : 'flex',
                                mt             : '2rem',
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
