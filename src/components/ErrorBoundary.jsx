import React, {Component} from 'react';
import {ToastSeverity, useToast} from '../hooks/use-toast';

export class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.showToast(error.message);
    }

    showToast = (message) => {
        const {enqueueToast} = useToast();
        enqueueToast(message, ToastSeverity.ERROR);
    };

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}