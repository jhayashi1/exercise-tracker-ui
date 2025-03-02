import {call} from './call';
import {BASE_API_URL} from './constants';
import type {GetSessionResp, GetSessionsOverviewResp, ListSessionsResp, StartSessionResp, StopSessionResp} from './types';

export const getSession = async (username: string, guid: string, auth: string): Promise<GetSessionResp> => {
    const resp = await call(`${BASE_API_URL}/session/session?username=${username}&guid=${guid}`, auth);
    return await resp.json() as GetSessionResp;
};

export const getSessionsOverview = async (auth: string): Promise<GetSessionsOverviewResp> => {
    const resp = await call(`${BASE_API_URL}/session/overview`, auth);

    return await resp.json() as GetSessionsOverviewResp;
};

export const listSessions = async (username: string, auth: string): Promise<ListSessionsResp> => {
    const resp = await call(`${BASE_API_URL}/session/list?username=${username}`, auth);

    return await resp.json() as ListSessionsResp;
};

export const startSession = async (auth: string): Promise<StartSessionResp> => {
    const resp = await call(`${BASE_API_URL}/session/start`, auth, {params: {method: 'POST'}});

    return await resp.json() as StartSessionResp;
};

export const stopSession = async (auth: string): Promise<StopSessionResp> => {
    const resp = await call(`${BASE_API_URL}/session/stop`, auth, {params: {method: 'POST'}});

    return await resp.json() as StopSessionResp;
};
