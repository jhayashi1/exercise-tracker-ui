import {useEffect, type FC} from 'react';
import {signOutRedirect} from '../https/sign-out';

export const SignOut: FC = () => {
    useEffect(signOutRedirect, []);

    return (<></>);
};
