import {Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Friends} from './pages/Friends';

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
];
