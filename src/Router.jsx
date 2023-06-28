import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Favourites from './pages/favourites/Favourites';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ItemDetail from './pages/item-detail/ItemDetail';
import { authLoader } from './loaders/auth.loader';
import { authGuardLoader } from './loaders/authGuard.loader';
import Main from './pages/main/Main';
import NotFound from './pages/notfound/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <NotFound />,
        loader: authGuardLoader,
        children: [
            {
                path: 'favourites',
                element: <Favourites />,
            },
            {
                path: '/books/:id',
                element: <ItemDetail />,
            },
            {
                element: <Home />,
                index: true
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
        loader: authLoader
    },
    {
        path: '/register',
        element: <Register />,
        loader: authLoader
    },

])

export const Router = () => <RouterProvider router={router} />