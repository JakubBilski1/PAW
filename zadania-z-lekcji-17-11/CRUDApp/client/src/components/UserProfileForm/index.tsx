import React, { useState } from 'react'
import styled from 'styled-components';
import { createUserProfile } from '../../services/userProfileService';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const FormButton = styled(Button)`
  margin-top: 10px;
`;

type UserProfileFormProps = {
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number;
}

function UserProfileForm({ userId, toggle, setShowModal }: UserProfileFormProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nickName: '',
        country: '',
        city: '',
        dateOfBirth: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async(e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            const response = await createUserProfile(formData.firstName, formData.lastName, formData.nickName, formData.city, formData.country, formData.dateOfBirth, userId);
            if(response.status === 201){
                toggle(prevVal => !prevVal);
                setShowModal(false);
            }
        }catch(error){
            console.log(error);
        }
        setFormData({
          firstName: '',
          lastName: '',
          nickName: '',
          country: '',
          city: '',
          dateOfBirth: '',
        });
    };
  return (
    <>
      <Form>
            <FormLabel htmlFor="firstName">First name:</FormLabel>
            <FormInput type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
            <FormLabel htmlFor="lastName">Last name:</FormLabel>
            <FormInput type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
            <FormLabel htmlFor="nickName">Nick name:</FormLabel>
            <FormInput type="text" id="nickName" name="nickName" value={formData.nickName} onChange={handleInputChange} />
            <FormLabel htmlFor="country">Country:</FormLabel>
            <FormInput type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} />
            <FormLabel htmlFor="city">City:</FormLabel>
            <FormInput type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} />
            <FormLabel htmlFor="dateOfBirth">Date of birth:</FormLabel>
            <FormInput type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
            <FormButton type="button" onClick={(e)=>handleSubmit(e)}>Create</FormButton>
        </Form>
    </>
  )
}

export default UserProfileForm
