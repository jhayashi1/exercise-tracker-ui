import type {AuthContextProps} from 'react-oidc-context';

export type CognitoAuthProps = AuthContextProps & {
    user?: {
        profile: {
            aud: string;
            'cognito:username': string;
            event_id: string;
            exp: number;
            iat: number;
            iss: string;
            origin_jti: string;
            sub: string;
            token_user: string;
        }
    }
}

export interface SessionMetadata {
    username: string;
    guid: string;
    startTimestamp: string;
    stopTimestamp?: string;
}

export interface GetSessionResp {
    session: SessionMetadata;
}

export interface GetSessionsOverviewResp {
    sessions: SessionMetadata[];
}

export interface ListSessionsResp {
    sessions: SessionMetadata[];
}

export interface StartSessionResp {
    session: {
        guid: string;
        startTimestamp: string;
    };
}

export interface StopSessionResp {
    session: {
        guid: string;
        startTimestamp: string;
        stopTimestamp: string;
    };
}

export interface FriendMetadata {
    username: string;
    friendUsername: string;
    createdTimestamp: string;
}

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface FriendRequestMetadata {
    username: string;
    guid: string;
    friendUsername: string;
    status: FriendRequestStatus;
    createdTimestamp: string;
    updatedTimestamp?: string;
}

export interface FriendRequestBody {
    friendUsername: string;
}

export interface FriendRequestResp {
    request: FriendRequestMetadata;
}

export interface ListFriendsResp {
    friends: string[];
}

export interface FriendRemoveResp {
    username: string;
    friendUsername: string;
}
