import {Typography} from '@mui/material';
import {useEffect, useState, type FC} from 'react';
import {useAuth} from 'react-oidc-context';
import {listSessions, startSession, stopSession} from '../https/session';
import {useAsyncEffect} from '../helpers/use-async-effect';
import type {CognitoAuthProps} from '../https/types';
import {ChartWithDateFilter} from '../components/BarChart';
import {requestFriend} from '../https/friend';

export const Home: FC = () => {
    const auth = useAuth() as CognitoAuthProps;
    const token = auth.user?.access_token ?? '';
    const username = auth.user?.profile['cognito:username'] ?? '';
    const [list, setList] = useState([]);
    const [data, setData] = useState({
        list:
            [
                {
                    startTimestamp: '2025-03-01T20:07:55.244Z',
                    guid          : '2b421beb-8e46-4474-8376-fdcc1f98b5a5',
                    username      : 'test',
                    stopTimestamp : '2025-03-02T04:30:27.057Z',
                },
                {
                    startTimestamp: '2025-03-01T04:30:25.639Z',
                    username      : 'test',
                    guid          : 'a0727305-a083-470f-a661-c96db8746bf0',
                    stopTimestamp : '2025-03-02T04:30:27.057Z',
                },
                {
                    startTimestamp: '2025-02-28T20:07:55.244Z',
                    guid          : '2b421beb-8e46-4474-8376-fdcc1f98b5a5',
                    username      : 'test',
                    stopTimestamp : '2025-02-28T04:30:27.057Z',
                },
                {
                    startTimestamp: '2025-03-02T04:30:23.158Z',
                    username      : 'test',
                    guid          : '198497ac-3986-4569-8d15-a2aabc282780',
                    stopTimestamp : '2025-03-01T04:30:24.666Z',
                },
                {
                    startTimestamp: '2025-03-02T20:07:55.244Z',
                    username      : 'test',
                    guid          : '03cbbf7d-4519-4702-a0f0-c7ea39e7ed56',
                    stopTimestamp : '2025-03-02T20:16:01.952Z',
                },
                {
                    startTimestamp: '2025-02-23T20:07:55.244Z',
                    username      : 'test',
                    guid          : '03cbbf7d-4519-4702-a0f0-c7ea39e7ed56',
                    stopTimestamp : '2025-02-21T20:16:01.952Z',
                },
                {
                    startTimestamp: '2025-03-02T20:07:55.244Z',
                    username      : 'test',
                    guid          : '03cbbf7d-4519-4702-a0f0-c7ea39e7ed56',
                    stopTimestamp : '2025-02-25T20:16:01.952Z',
                },
            ],
    });

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            auth.signinRedirect();
        }
    }, [auth.isLoading, auth.isAuthenticated]);

    useAsyncEffect(async () => {
        if (auth.isAuthenticated) {
            // const listSessionsResult = await listSessions(username, token);
            // setData({list: listSessionsResult});
        }
    }, [auth]);

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    return (
        <div>
            <Typography> Hello: {auth.user?.profile['cognito:username']} </Typography>
            {/* <Typography> ID Token: {auth.user?.id_token} </Typography>
            <Typography> Access Token: {auth.user?.access_token} </Typography>
            <Typography> Refresh Token: {auth.user?.refresh_token} </Typography> */}

            <button onClick={async () => await startSession(token)}>Start Session</button>
            <button onClick={async () => await stopSession(token)}>Stop Session</button>
            <ChartWithDateFilter data={data.list}></ChartWithDateFilter>
            <button onClick={async () => await requestFriend('jhayashi', token)}>Request Friend</button>
        </div>
    );
};
