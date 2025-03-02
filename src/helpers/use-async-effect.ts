import type {DependencyList} from 'react';
import {useEffect} from 'react';

export const useAsyncEffect = <T extends () => Promise<void>>(
    handler: T,
    deps?: DependencyList
): void => {
    useEffect(
        () => {
            void handler();
        },
        deps
    );
};
