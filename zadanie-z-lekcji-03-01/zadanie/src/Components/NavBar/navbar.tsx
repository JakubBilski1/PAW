import { Link } from "react-router-dom"
import { routes } from "../../Helpers/routes"

function NavBar() {
  return (
    <nav>
        <ul>
            {routes.map((route) => {
                return(
                    <li key={route.path}>
                        <Link to={route.path}>{route.name}</Link>
                    </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default NavBar
