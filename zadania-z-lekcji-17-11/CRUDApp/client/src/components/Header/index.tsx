import styled from 'styled-components';
import routes from '../../helpers/routes';

const StyledHeader = styled.header`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  height: 10vh
`;

const Logo = styled.div`
  font-size: 24px;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;

    li {
      margin-right: 20px;

      a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #ffcc00;
        }
      }
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Logo>Logo</Logo>
      <Navigation>
        <ul>
          {routes.map((route, index) => (
            <li key={index}><a href={route.path}>{route.name}</a></li>
          ))}
        </ul>
      </Navigation>
    </StyledHeader>
  );
}

export default Header;
