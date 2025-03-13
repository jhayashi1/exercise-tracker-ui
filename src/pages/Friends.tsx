import {useState, type FC} from 'react';
import type {CognitoAuthProps, FriendRequestAction, FriendRequestMetadata, FriendRequestStatus} from '../https/types';
import {useAuth} from 'react-oidc-context';
import {Button, Card, Container, Divider, Grid2, TextField, Typography} from '@mui/material';
import {useAsyncEffect} from '../helpers/use-async-effect';
import {friendRequestAction, listFriendRequests, listFriends, removeFriend, requestFriend} from '../https/friend';
import {ToastSeverity, useToast} from '../hooks/use-toast';

export const Friends: FC = () => {
    const auth = useAuth();
    const token = auth.user?.access_token ?? '';
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pendingRequests, setPendingRequests] = useState<FriendRequestMetadata[]>([]);
    const [friends, setFriends] = useState<string[]>([]);
    const [addFriendField, setAddFriendField] = useState<string>('');
    const {enqueueToast} = useToast();

    useAsyncEffect(async () => {
        if (!isLoading) {
            return;
        }
        setIsLoading(false);

        // const response = await listFriends(username, token);
        // const {requests} = await listFriendRequests(token);
        const requests = [
            {
                friendUsername  : 'test1',
                username        : 'test',
                guid            : '8a600c5d-8b02-4143-8e49-02fdf564cf02',
                createdTimestamp: '2025-03-09T19:39:53.787Z',
                status          : 'pending' as FriendRequestStatus,
            },
        ];
        setFriends(['jhayashi', 'friend']);
        setPendingRequests(requests);
    }, []);

    const handleAddFriend = async (): Promise<void> => {
        if (addFriendField.trim()) {
            const response = await requestFriend(addFriendField, token);

            if (response.ok) {
                enqueueToast(`Sent request to ${addFriendField}`, ToastSeverity.SUCCESS);
                setAddFriendField('');
            }
        }
    };

    const handleRequestAction = async (guid: string, action: FriendRequestAction, username: string): Promise<void> => {
        const response = await friendRequestAction(guid, action, token);

        if (response.ok) {
            enqueueToast(`Successfully ${String(action)} ${username}'s request`, ToastSeverity.SUCCESS);

            const newPendingRequests = pendingRequests.filter((request) => request.guid !== guid);
            setPendingRequests(newPendingRequests);
        }
    };

    return (
        <Container
            maxWidth='lg'
            sx={{mt: '3rem'}}
        >
            {pendingRequests.length && (
                <>
                    <Typography variant='h4'>
                        {'Pending Requests'}
                    </Typography>
                    {pendingRequests.map(({guid, username}) => (
                        <div key={guid}>
                            <Card
                                sx={{
                                    height        : '100%',
                                    mt            : '1rem',
                                    textDecoration: 'none',
                                    color         : 'inherit',
                                    display       : 'block',
                                }}
                                variant='outlined'
                            >
                                <Grid2
                                    container
                                    alignItems='center'
                                    direction='row'
                                    sx={{my: '1rem'}}
                                >
                                    <Grid2
                                        size={10}
                                    >
                                        <Typography
                                            sx={{pl: '1rem', fontWeight: 'semibold'}}
                                            variant='h5'
                                        >
                                            {username}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={1}>
                                        <Button
                                            sx={{mr: '2rem'}}
                                            variant='outlined'
                                            onClick={async () => { await handleRequestAction(guid, 'accepted', username); }}
                                        >
                                            <Typography

                                                sx={{textTransform: 'none'}}
                                                variant='body2'
                                            >
                                                {'Accept'}
                                            </Typography>
                                        </Button>
                                    </Grid2>
                                    <Grid2 size={1}>
                                        <Button

                                            sx={{mr: '2rem'}}
                                            variant='outlined'
                                            onClick={async () => { await handleRequestAction(guid, 'declined', username); }}
                                        >
                                            <Typography

                                                sx={{textTransform: 'none'}}
                                                variant='body2'
                                            >
                                                {'Decline'}
                                            </Typography>
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            </Card>
                            <Divider sx={{mt: '2rem'}}></Divider>
                        </div>
                    ))}
                </>
            )}
            <Typography sx={{mt: '2rem'}} variant='h4'>
                {'Add Friend'}
            </Typography>
            <Grid2
                container
                alignItems='center'
                spacing={2}
                sx={{mt: '1rem'}}
            >
                <Grid2 size={10}>
                    <TextField
                        fullWidth
                        label='Username'
                        value={addFriendField}
                        variant='outlined'
                        onChange={(e) => { setAddFriendField(e.target.value); }}
                    />
                </Grid2>
                <Grid2 size={2}>
                    <Button
                        fullWidth
                        // disabled={!addFriendField}
                        variant='outlined'
                        onClick={handleAddFriend}
                    >
                        <Typography sx={{textTransform: 'none'}} variant='body2'>
                            {'Add friend'}
                        </Typography>
                    </Button>
                </Grid2>
            </Grid2>

            <Divider sx={{mt: '2rem'}}></Divider>
            <Typography sx={{mt: '2rem'}} variant='h4'>
                {'Friends'}
            </Typography>
            {friends.map((friend) => (
                <Card
                    key={friend}
                    sx={{
                        height        : '100%',
                        mt            : '1rem',
                        textDecoration: 'none',
                        color         : 'inherit',
                        display       : 'block',
                    }}
                    variant='outlined'
                >
                    <Grid2
                        container
                        alignItems='center'
                        direction='row'
                        sx={{my: '1rem'}}
                    >
                        <Grid2
                            size={11}
                        >
                            <Typography
                                sx={{pl: '1rem', fontWeight: 'semibold'}}
                                variant='h5'
                            >
                                {friend}
                            </Typography>
                        </Grid2>
                        <Grid2
                            size={1}
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
                        </Grid2>
                    </Grid2>
                </Card>
            ))}
        </Container>
    );
};
