export interface CallParams {
    params?: RequestInit;
    headers?: Record<string, any>;
    body?: RequestInit['body']
}

export const call = async (url: string, auth: string, p?: CallParams): Promise<Response> => {
    const {params = {}, headers = {}} = p ?? {};

    try {

        const response = await fetch(url,
            {
                headers: {
                    authorization: `Bearer ${auth}`,
                    ...headers,
                },
                ...params,
            }
        );

        if (response.status > 400) {
            throw new ApiError(response.status, response.statusText);
        }

        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        console.error(`unhandled error ${String(error)}`);
    }
};

class ApiError extends Error {
    name: string;
    status: number;
    statusText: string;

    constructor(status: number, statusText: string) {
        super();
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
    }
}
