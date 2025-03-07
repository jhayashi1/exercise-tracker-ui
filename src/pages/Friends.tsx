import {useState, type FC} from 'react';
import type {CognitoAuthProps} from '../https/types';
import {useAuth} from 'react-oidc-context';
import {Button, Card, Container, Grid, Typography} from '@mui/material';
import {useAsyncEffect} from '../helpers/use-async-effect';
import {listFriends} from '../https/friend';

export const Friends: FC = () => {
    const auth = useAuth() as CognitoAuthProps;
    const token = auth.user?.access_token ?? '';
    const username = auth.user?.profile['cognito:username'] ?? '';
    const [friends, setFriends] = useState<string[]>([]);

    useAsyncEffect(async () => {
        // const response = await listFriends(username, token);
        setFriends(['jhayashi', 'friend']);
    }, []);

    return (
        <Container
            maxWidth='lg'
            sx={{mt: '3rem'}}
        >
            {friends.map((friend) => (
                <Card
                    raised
                    key={friend}
                    sx={{
                        height        : '100%',
                        my            : '2rem',
                        textDecoration: 'none',
                        color         : 'inherit',
                        display       : 'block',
                    }}
                    variant='outlined'
                >
                    <Grid
                        container
                        alignItems='center'
                        direction='row'
                        sx={{my: '1rem'}}
                    >
                        <Grid
                            item
                            sm={8}
                            xs={8}
                        >
                            <Typography
                                sx={{ml: '1rem', fontWeight: 'semibold'}}
                                variant='h5'
                            >
                                {friend}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={4}
                            xs={4}
                        >
                            <Button
                                disableRipple
                                sx={{
                                    p              : '0.5rem',
                                    color          : 'inherit',
                                    backgroundColor: '',
                                    justifyContent : 'center',
                                    alignItems     : 'center',
                                }}
                                variant='contained'
                            >
                                button
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Container>
    );
};
