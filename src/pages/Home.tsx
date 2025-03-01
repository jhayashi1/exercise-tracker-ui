import type {FC} from 'react';
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

    const signOutRedirect = (): void => {
        const clientId = '2noitmshfthr2ha1s1amr8iafp';
        const logoutUri = 'http://localhost:8080';
        const cognitoDomain = 'https://exercise-tracker-domain.auth.us-east-1.amazoncognito.com';
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    const apiCall = async (url: string): Promise<void> => {
        const resp = await fetch(url, {headers: {authorization: `Bearer ${auth.user!.access_token}`}});
        const json = await resp.text();
        console.log(json);
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile['cognito:username']} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={async () => await auth.removeUser()}>Sign out</button>
                <button onClick={async () => await apiCall('https://api.jaredhayashi.com/todo')}>API call</button>
                <button onClick={async () => await apiCall('https://api.jaredhayashi.com/session/sessions')}>Sessions call</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={async () => await auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
};
