import { Link } from "react-router-dom"
import { routes } from "../../helpers/routes"
import styled from "styled-components"
const Nav = styled.nav`
  background-color: #454545;
  width: 20vw;
  border-right: 2px solid gray;
`

const LiStyle = styled.li`
  display: inline-block;
  margin-left: 10px;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: blue;
  }
`

function NavBar() {
  return (
    <Nav>
        {routes.map((route) => (
            <LiStyle key={route.path}>
                <LinkStyle to={route.path}>{route.name}</LinkStyle>
            </LiStyle>
        ))}
    </Nav>
  )
}

export default NavBar