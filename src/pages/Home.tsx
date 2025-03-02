import {Typography} from '@mui/material';
import {useEffect, useState, type FC} from 'react';
import type {AuthContextProps} from 'react-oidc-context';
import {useAuth} from 'react-oidc-context';

type CognitoAuthProps = AuthContextProps & {
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

export const Home: FC = () => {
    const auth = useAuth() as CognitoAuthProps;
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            auth.signinRedirect();
        }
    }, [auth.isLoading, auth.isAuthenticated]);

    const signOutRedirect = (): void => {
        const clientId = '2noitmshfthr2ha1s1amr8iafp';
        const logoutUri = 'http://localhost:8080';
        const cognitoDomain = 'https://exercise-tracker-domain.auth.us-east-1.amazoncognito.com';
        const responseType = 'code';
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&redirect_uri=${encodeURIComponent(logoutUri)}&response_type=${responseType}`;
    };

    const apiCall = async (url: string): Promise<void> => {
        const resp = await fetch(url, {headers: {authorization: `Bearer ${auth.user!.access_token}`}});
        const json = await resp.json();
        console.log(json);
    };

    const postApiCall = async (url: string): Promise<void> => {
        const resp = await fetch(url, {method: 'POST', headers: {authorization: `Bearer ${auth.user!.access_token}`}});
        const json = await resp.json();
        console.log(json);
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    console.log(auth.user);

    return (
        <div>
            <Typography> Hello: {auth.user?.profile['cognito:username']} </Typography>
            {/* <Typography> ID Token: {auth.user?.id_token} </Typography>
            <Typography> Access Token: {auth.user?.access_token} </Typography>
            <Typography> Refresh Token: {auth.user?.refresh_token} </Typography> */}

            <button onClick={signOutRedirect}>Sign out</button>
            <button onClick={async () => await apiCall('https://api.jaredhayashi.com/todo')}>API call</button>
            <button onClick={async () => await apiCall('https://api.jaredhayashi.com/session/session?username=jhayashi&guid=ca44bfbc-e060-4af6-9a85-24c818811028')}>Sessions call</button>
            <button onClick={async () => await apiCall('https://api.jaredhayashi.com/session/list?username=jhayashi')}>List Sessions</button>
            <button onClick={async () => await apiCall('https://api.jaredhayashi.com/session/overview')}>Overview Sessions</button>
            <button onClick={async () => await postApiCall('https://api.jaredhayashi.com/session/start')}>Start Session</button>
            <button onClick={async () => await postApiCall('https://api.jaredhayashi.com/session/end')}>Stop Session</button>
        </div>
    );
};
