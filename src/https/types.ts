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
