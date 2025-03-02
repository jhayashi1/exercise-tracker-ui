export interface CallParams {
    params?: RequestInit;
    headers?: Record<string, any>;
}

export const call = async (url: string, auth: string, p?: CallParams): Promise<Response> => {
    const {params = {}, headers = {}} = p ?? {};

    return await fetch(url,
        {
            headers: {
                authorization: `Bearer ${auth}`,
                ...headers,
            },
            ...params,
        }
    );
};
