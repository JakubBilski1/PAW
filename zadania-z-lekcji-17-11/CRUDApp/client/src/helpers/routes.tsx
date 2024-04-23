import Categories from "../pages/Categories/page";
import RandomData from "../pages/RandomData/page";
import Posts from "../pages/Posts/page";
import Users from "../pages/Users/page";
import Home from "../pages/Home/page";

type RouteElement = {
    path: string;
    element: JSX.Element;
    name: string;
    hideInNav?: boolean;
}

export const routes: RouteElement[] = [
    {
        path: '/',
        element: <Home />,
        name: 'Home',
        hideInNav: false
    },
    {
        path: '/categories',
        element: <Categories />,
        name: 'Categories',
        hideInNav: false
    },
    {
        path: '/posts',
        element: <Posts />,
        name: 'Posts',
        hideInNav: false
    },
    {
        path: '/randomData',
        element: <RandomData />,
        name: 'RandomData',
        hideInNav: false
    },
    {
        path: '/users',
        element: <Users />,
        name: 'Users',
        hideInNav: false
    },
]

export default routes