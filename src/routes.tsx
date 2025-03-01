import {Route} from 'react-router-dom';
import {Home} from './pages/Home';

export const routes = [
    <Route
        element={<Home />}
        key='home'
        path='/'
    />,
];
