import { Link } from "react-router-dom"
import { routes } from "../../helpers/routes"

function NavBar() {
  return (
    <nav>
        {routes.map((route) => (
            <li key={route.path}>
                <Link to={route.path}>{route.name}</Link>
            </li>
        ))}
    </nav>
  )
}

export default NavBar