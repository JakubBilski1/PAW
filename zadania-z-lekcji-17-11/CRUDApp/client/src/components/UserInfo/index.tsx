import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User, UserProfile } from '../../types/User';
import Modal from '../Modal';
import UserProfileForm from '../UserProfileForm';
import { getUserProfile } from '../../services/userProfileService';
import UserProfileData from './UserProfile';
import EditProfileForm from '../EditProfileForm';
import { deleteUser, getUser } from '../../services/userService';
import { useQueryClient } from '@tanstack/react-query';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Dostosuj wysokość do preferencji */
  font-size: 1.2rem;
  color: #555; /* Kolor tekstu */
`;

const ErrorMessage = styled.p`
  color: #ff6347; /* Czerwony kolor */
  font-size: 1.2rem;
`;

const UserInfoContainer = styled.div`
  border: 1px solid #ddd; /* Ramka */
  border-radius: 5px; /* Zakrąglenie rogów */
  padding: 20px; /* Odstęp wewnątrz kontenera */
  display: flex;
    flex-direction: column;
    align-items: start;
    gap: 30px;
`;

const UserInfoItem = styled.p`
  margin: 5px 0; /* Odstęp między elementami */
`;

const Button = styled.button`
  background-color: #007bff; /* Niebieski kolor tła */
  color: #fff; /* Biały kolor tekstu */
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Wielkość przycisku */
  margin-right: 10px; /* Odstęp między przyciskami */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Animacja zmiany koloru tła */

  &:hover {
    background-color: #0056b3; /* Ciemniejszy odcień niebieskiego po najechaniu myszką */
  }

  &:last-child {
    margin-right: 0; /* Nie ma odstępu po ostatnim przycisku */
  }
`;

const DataBox = styled.div`
`;

type UserComponentProps = {
  isLoading: boolean;
  isError: boolean;
  isButtonClicked: boolean;
  user: User;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  send: boolean;
}

const UserComponent = ({ isLoading, isError, isButtonClicked, user, toggle, send }: UserComponentProps) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [sent, toggleSent] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const queryClient = useQueryClient()
  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await getUserProfile(user.id);
        if(response.status === 200){
          setUserProfile(response.data)
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchData();
  }, [sent])

  useEffect(() => {
    const fetchData = async() => {
      const newData = await getUser(user.id.toString())
      await queryClient.setQueryData(['user', user.id], newData)
    }
    fetchData();
  }, [send]);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  }

  const editUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowEditModal(true);
  }

  const delUser = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      const response = await deleteUser(user.id);
      if(response?.status === 200){
        alert('User deleted');
      }else{
        alert('Error occurred');
      }
    }catch(error){
      console.error(error);
    }
  }
  return (
    <>
      {isLoading && <LoadingContainer>Loading...</LoadingContainer>}
      {isError && <ErrorMessage>Error occurred</ErrorMessage>}
      {isButtonClicked && user && (
        <UserInfoContainer>
          <DataBox>
            <UserInfoItem>id: {user.id}</UserInfoItem>
            <UserInfoItem>email: {user.email}</UserInfoItem>
            <UserInfoItem>password: {user.password}</UserInfoItem>
            {!userProfile && <Button onClick={handleCreateClick} type="button">
                Create user's profile
            </Button>}
            <Button type="button" onClick={(e)=>editUser(e)}>Edit user</Button>
            <Button type="button" onClick={(e)=>delUser(e)}>Delete user</Button>
          </DataBox>
          {userProfile && <UserProfileData userProfile={userProfile}/>}
        </UserInfoContainer>
      )}

      {showCreateModal && (
        <Modal setShowModal={setShowCreateModal} children={
            <UserProfileForm userId={user.id} toggle={toggleSent} setShowModal={setShowCreateModal}/>
        }/>
      )}

      {showEditModal && (
        <Modal setShowModal={setShowEditModal} children={
            <EditProfileForm userId={user.id} email={user.email} password={user.password} toggle={toggle} setShowModal={setShowEditModal}/>
        }/>
      )}
    </>
  );
};

export default UserComponent;
