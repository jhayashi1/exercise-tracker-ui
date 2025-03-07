import {call} from './call';
import {BASE_API_URL} from './constants';
import type {FriendRequestResp, ListFriendsResp} from './types';

export const requestFriend = async (username: string, auth: string): Promise<FriendRequestResp> => {
    const resp = await call(`${BASE_API_URL}/friend/request`,
        auth,
        {
            params: {
                method: 'POST',
                body  : JSON.stringify({friendUsername: username}),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return await resp.json() as FriendRequestResp;
};

export const listFriends = async (username: string, auth: string): Promise<ListFriendsResp> => {
    const resp = await call(`${BASE_API_URL}/friend/list?username=${username}`,
        auth,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return await resp.json() as ListFriendsResp;
};
