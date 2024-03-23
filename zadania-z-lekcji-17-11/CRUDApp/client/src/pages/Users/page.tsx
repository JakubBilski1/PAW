import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { addUser, getUsers, useUser, useUsers } from '../../services/userService'
import UserComponent from '../../components/UserInfo';
import { useQueryClient } from '@tanstack/react-query';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Panel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form``;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: calc(100% - 20px);
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Users() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [sent, toggleSent] = useState<boolean>(false);
  const { data: user, isLoading: load, isError } = useUser(searchQuery || "");
  const queryClient = useQueryClient()
  const { data: users, isLoading: loadUsers, isError: errorUsers } = useUsers();
  useEffect(() => {
    const fetchData = async() => {
      const newData = await getUsers()
      await queryClient.setQueryData(['users'], newData)
    }
    fetchData();
  }, [sent]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
    setIsButtonClicked(false);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsButtonClicked(true);
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const createUser = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addUser(email, password);
      if(response?.status === 201) {
        toggleSent(prevVal => !prevVal)
      }
    } catch (err) {
      console.log(err);
      alert('Error occurred');
    } finally {
      setLoading(false);
    }
    setEmail('');
    setPassword('');
  }
  return (
    <Container>
      <Panel>
        <Title>Search User</Title>
        <Form>
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Wyszukaj użytkownika..."
          />
          <Button type="submit" onClick={(e: FormEvent<HTMLButtonElement>)=>handleSearchSubmit(e)}>Szukaj</Button>
          {isButtonClicked && user && (!user?.error ? <UserComponent isLoading={load} isError={isError} isButtonClicked={isButtonClicked} user={user} toggle={toggleSent} send={sent}/> : <p>{user?.error}</p>)}
        </Form>
      </Panel>
      <Panel>
      <Title>Create User</Title>
        <Form>
          <Input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Hasło"
          />
          <Button type="submit" onClick={(e: FormEvent<HTMLButtonElement>)=>createUser(e)}>Dodaj użytkownika</Button>
          {loading && <p>Creating user...</p>}
        </Form>
      </Panel>
      <Panel>
        <Title>All Users:</Title>
        {loadUsers && <p>Loading...</p>}
        {errorUsers && <p>Error occurred</p>}
        {users && users.map((user) => (
          <p key={user.id}>{user.id}. {user.email}</p>
        ))}
      </Panel>
    </Container>
  );
}

export default Users;