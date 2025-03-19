import type {ApiError} from '../https/call';
import {ToastSeverity, useToast} from './use-toast';

export const useErrorHandling = (): { handleApiCall: (apiCall: (...args: unknown[]) => Promise<Response | undefined>, ...args: unknown[]) => Promise<Response | undefined> } => {
    const {enqueueToast} = useToast();

    const handleApiCall = async (apiCall: () => Promise<Response | undefined>): Promise<Response | undefined> => {
        try {
            return await apiCall();
        } catch (error) {
            const apiError = error as ApiError;
            enqueueToast(`${apiError.status.toString()}: ${apiError.statusText}`, ToastSeverity.ERROR);
        }
    };

    return {handleApiCall};
};
