 import { useQuery } from '@tanstack/react-query';
import { User } from '../types/User';
import axios from 'axios';

const getUsers = async () => {
    return await fetch(`http://localhost:5000/u`)
        .then(res => res.json())
        .then(data => data as User[]);
}

const getUser = async (id: string) => {
    return await fetch(`http://localhost:5000/u/${id}`)
        .then(res => res.json())
        .then(data => data as User);
}

const addUser = async (email: string, password: string) => {
    try{
        return await axios.post('http://localhost:5000/u', { email, password });
    }catch(error){
        console.error(error);
    }
}

const updateUser = async (id:number, email: string, password: string) => {
    try{
        return await axios.put(`http://localhost:5000/u/${id}`, { email, password });
    }catch(error){
        console.error(error);
    }
}

const deleteUser = async (id: number) => {
    try{
        return await axios.delete(`http://localhost:5000/u/${id}`);
    }catch(error){
        console.error(error);
    }
}

const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: getUsers
    });
}

const useUser = (id: string) => {
    return useQuery<User>({
        queryKey: ['user', id
        ],
        queryFn: () => getUser(id.toString())
    });
}

export {
    getUsers,
    getUser,
    useUsers,
    useUser,
    addUser,
    updateUser,
    deleteUser
}