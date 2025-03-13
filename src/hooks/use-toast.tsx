import {createContext, useContext, useState, type FC, type ReactNode} from 'react';
import {Snackbar, Alert} from '@mui/material';

export enum ToastSeverity {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
};

interface ToastProps {
    open: boolean;
    message: string;
    severity: ToastSeverity;
    onClose: () => void;
}

interface ToastContextProps {
    enqueueToast: (message: string, severity: ToastSeverity) => void;
}

const Toast: FC<ToastProps> = ({open, message, severity, onClose}) => (
    <Snackbar
        autoHideDuration={6000} open={open}
        onClose={onClose}
    >
        <Alert
            severity={severity}
            sx={{width: '100%'}}
            variant='filled'
            onClose={onClose}
        >
            {message}
        </Alert>
    </Snackbar>
);

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: FC<{children: ReactNode}> = ({children}) => {
    const [toast, setToast] = useState<{open: boolean, message: string, severity: ToastSeverity}>({open: false, message: '', severity: 'success'});

    const enqueueToast = (message: string, severity: ToastSeverity): void => {
        setToast({open: true, message, severity});
    };

    const handleClose = (): void => {
        setToast({...toast, open: false});
    };

    return (
        <ToastContext.Provider value={{enqueueToast}}>
            {children}
            <Toast
                message={toast.message}
                open={toast.open}
                severity={toast.severity}
                onClose={handleClose}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
};
