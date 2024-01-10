import Blog from "../pages/Blog/page";
import Home from "../pages/Home/page";
import BlogPost from "../Components/BlogPost";

interface RouteElement {
    path: string;
    element: JSX.Element;
    name: string;
    hideInNavbar?: boolean;
}

export const routes: Array<RouteElement> = [
    {
        path: "/",
        element: <Home />,
        name: "Home",
        hideInNavbar: false
    },
    {
        path: "/blog",
        element: <Blog />,
        name: "Blog",
        hideInNavbar: false
    },
    {
        path: "/blog/:id",
        element: <BlogPost />,
        name: "BlogPost",
        hideInNavbar: true
    }
]