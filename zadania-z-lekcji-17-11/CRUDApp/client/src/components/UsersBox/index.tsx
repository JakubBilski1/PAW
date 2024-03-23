import styled from "styled-components";
import { useUsers } from "../../services/userService";

const UserBoxStyle = styled.div`
  background-color: #333;
  color: white;
  border-radius: 15px;
  height: 100%;
`;

const Header = styled.h2`
    text-align: center;
`

const UserList = styled.ul`
    list-style: none;
    padding: 0;
`

const UserLink = styled.a`
    color: white;
    text-decoration: none;
`

function UsersBox() {
    const { data: users, isLoading: loading, error } = useUsers();
    return (
      <UserBoxStyle>
        <Header>Users</Header>
        <UserList>
            {loading && <li>Loading...</li>}
            {error && <li>No users found</li>}
            {users?.map(user => (
                <li key={user.id}>{user.email}</li>
            ))}
        </UserList>
        <UserLink href="/users">Explore more about users</UserLink>
      </UserBoxStyle>
    );
}

export default UsersBox