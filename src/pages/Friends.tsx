import {useState, type FC} from 'react';
import type {CognitoAuthProps} from '../https/types';
import {useAuth} from 'react-oidc-context';
import {Button, Card, Container, Grid, TextField, Typography} from '@mui/material';
import {useAsyncEffect} from '../helpers/use-async-effect';
import {listFriends, removeFriend, requestFriend} from '../https/friend';

export const Friends: FC = () => {
    const auth = useAuth() as CognitoAuthProps;
    const token = auth.user?.access_token ?? '';
    const [friends, setFriends] = useState<string[]>([]);
    const [addFriendField, setAddFriendField] = useState<string>('');

    useAsyncEffect(async () => {
        // const response = await listFriends(username, token);
        setFriends(['jhayashi', 'friend']);
    }, []);

    const handleAddFriend = async (): Promise<void> => {
        if (addFriendField.trim()) {
            const response = await requestFriend(addFriendField, token);
            if (response.ok) {
                setAddFriendField('');
                // TODO: toast for adding friend
            }
        }
    };

    return (
        <Container
            maxWidth='lg'
            sx={{mt: '3rem'}}
        >
            <Grid
                container
                alignItems='center'
                spacing={2}
            >
                <Grid item xs={10}>
                    <TextField
                        fullWidth
                        label='Add a friend'
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset'            : {borderColor: '#303030'},
                                '&:hover fieldset'      : {borderColor: 'white'},
                                '&.Mui-focused fieldset': {borderColor: 'white'},
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white',
                            },
                        }}
                        value={addFriendField}
                        variant='outlined'
                        onChange={(e) => setAddFriendField(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={handleAddFriend}
                    >
                        <Typography sx={{textTransform: 'none'}} variant='body2'>
                            {'Add friend'}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            {friends.map((friend) => (
                <Card
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
                            sm={11}
                            xs={11}
                        >
                            <Typography
                                sx={{pl: '1rem', fontWeight: 'semibold'}}
                                variant='h5'
                            >
                                {friend}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={1}
                            xs={1}
                        >
                            <Button
                                sx={{mr: '2rem'}}
                                variant='outlined'
                                onClick={async () => await removeFriend(friend, token)}
                            >
                                <Typography sx={{textTransform: 'none'}} variant='body2'>
                                    {'Remove'}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Container>
    );
};
