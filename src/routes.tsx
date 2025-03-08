import {Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Friends} from './pages/Friends';
import {SignOut} from './pages/SignOut';

export const routes = [
    <Route
        element={<Home />}
        key='home'
        path='/'
    />,
    <Route
        element={<Friends />}
        key='friends'
        path='/friends'
    />,
    <Route
        element={<SignOut />}
        key='signout'
        path='/signout'
    />,
];
