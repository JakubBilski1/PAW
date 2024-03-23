import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateUser } from "../../services/userService";

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

type EditProfileFormProps = {
    userId: number;
    email: string;
    password: string;
    toggle: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditProfileForm({ userId, email, password, toggle, setShowModal }: EditProfileFormProps) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const setEditData = () => {
      setData({
        email: email,
        password: password,
      });
    }
    setEditData();
  }
  , [email, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const editUser = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      console.log(userId, data.email, data.password)
        const response = await updateUser(userId, data.email, data.password);
        if(response?.status === 200){
            toggle(prevVal=>!prevVal);
            setShowModal(false);
        }
    }catch(error){
        alert('Error occurred');
        console.error(error);
    }
  }
  return (
    <Form>
        <Input
            type="text"
            onChange={handleChange}
            defaultValue={email}
            placeholder="Email"
            name="email"
        />
        <Input
            type="password"
            onChange={handleChange}
            defaultValue={password}
            placeholder="Hasło"
            name="password"
        />
        <Button type="submit" onClick={(e)=>editUser(e)}>Edit user</Button>
    </Form>
  )
}

export default EditProfileForm
