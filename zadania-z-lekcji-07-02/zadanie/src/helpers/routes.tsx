import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";

interface RouteElement {
    path: string;
    element: JSX.Element;
    name: string;
    hideInNavbar?: boolean;
    header?: string;
}

export const routes: Array<RouteElement> = [
    {
        path: "/",
        element: <Home />,
        name: "Home",
        hideInNavbar: false,
        header: "Home"
    },
    {
        path: "/about",
        element: <About />,
        name: "About",
        hideInNavbar: false,
        header: "About"
    },
    {
        path: "/contact",
        element: <Contact />,
        name: "Contact",
        hideInNavbar: false,
        header: "Contact"
    }
]