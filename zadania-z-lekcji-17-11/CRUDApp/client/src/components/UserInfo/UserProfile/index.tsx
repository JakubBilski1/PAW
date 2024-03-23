import React, { useState } from 'react';
import styled from 'styled-components';
import { UserProfile } from '../../../types/User';
import { deleteUserProfile, updateUserProfile } from '../../../services/userProfileService';

const UserInfoContainer = styled.div`
  /* Dodaj stylizację dla kontenera informacji o użytkowniku */
`;

const UserInfoInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
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

type UserProfileFormProps = {
    userProfile: UserProfile;
}

const UserProfileData = ({ userProfile }: UserProfileFormProps) => {
  const [editedProfile, setEditedProfile] = useState({ ...userProfile });
  const [isEdited, setIsEdited] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    setEditedProfile({ ...editedProfile, [field]: e.target.value });
    setIsEdited(true);
  };

  const handleUpdateProfile = async() => {
    setIsEdited(false);
    try{
      const response = await updateUserProfile(editedProfile.userId, editedProfile.firstName, editedProfile.lastName, editedProfile.nickName, editedProfile.city, editedProfile.country, editedProfile.dob);
      if(response.status === 200){
        alert('Profile updated');
      }
    }catch(error){
      console.error(error);
    }
  };

  const handleDeleteProfile = async() => {
    try{
      const response = await deleteUserProfile(editedProfile.userId);
      if(response.status === 200){
        alert('Profile deleted');
      }
    }catch(error){
      console.error(error);
    }
  }

  return (
    <UserInfoContainer>
      {!userProfile?.error && userProfile && (
        <>
          <UserInfoInput
            type="text"
            value={editedProfile.firstName}
            onChange={(e) => handleInputChange(e, 'firstName')}
            placeholder="First name"
          />
          <UserInfoInput
            type="text"
            value={editedProfile.lastName}
            onChange={(e) => handleInputChange(e, 'lastName')}
            placeholder="Last name"
          />
          <UserInfoInput
            type="text"
            value={editedProfile.nickName}
            onChange={(e) => handleInputChange(e, 'nickName')}
            placeholder="Nick name"
          />
          <UserInfoInput
            type="text"
            value={editedProfile.city}
            onChange={(e) => handleInputChange(e, 'city')}
            placeholder="City"
          />
          <UserInfoInput
            type="text"
            value={editedProfile.country}
            onChange={(e) => handleInputChange(e, 'country')}
            placeholder="Country"
          />
          <UserInfoInput
            type="text"
            value={editedProfile.dob.toString().split("T")[0]}
            onChange={(e) => handleInputChange(e, 'dob')}
            placeholder="Date of birth"
          />
          <ButtonBox>
            {isEdited && <Button onClick={handleUpdateProfile}>Update Profile</Button>}
            <Button onClick={handleDeleteProfile}>Delete Profile</Button>
          </ButtonBox>
        </>
      )}
    </UserInfoContainer>
  );
};

export default UserProfileData;
