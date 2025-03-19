import {call} from './call';
import {BASE_API_URL} from './constants';
import type {FriendRemoveResp, FriendRequestAction, ListFriendRequestsResp, ListFriendsResp} from './types';

export const requestFriend = async (username: string, auth: string): Promise<Response | undefined> => {
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

    return resp;
};

export const friendRequestAction = async (guid: string, action: FriendRequestAction, auth: string): Promise<Response | undefined> => {
    const resp = await call(`${BASE_API_URL}/friend/request-action`,
        auth,
        {
            params: {
                method: 'POST',
                body  : JSON.stringify({guid, action}),
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return resp;
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

export const listFriendRequests = async (auth: string): Promise<ListFriendRequestsResp> => {
    const resp = await call(`${BASE_API_URL}/friend/list-requests`,
        auth,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return await resp.json() as ListFriendRequestsResp;
};

export const removeFriend = async (username: string, auth: string): Promise<FriendRemoveResp> => {
    const resp = await call(`${BASE_API_URL}/friend/remove`,
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

    return await resp.json() as FriendRemoveResp;
};
