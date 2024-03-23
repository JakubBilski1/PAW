import axios from "axios";

const getUserProfile = async (id: number) => {
    return await axios.get(`http://localhost:5000/up/${id}`);
}

const createUserProfile = async (firstName: string, lastName: string, nickName: string, city: string, country: string, dob: string, userId: number) => {
    return await axios.post('http://localhost:5000/up', { firstName, lastName, nickName, city, country, dob, userId });
}

const updateUserProfile = async (id: number, firstName: string, lastName: string, nickName: string, city: string, country: string, dob: Date) => {
    return await axios.put(`http://localhost:5000/up/${id}`, { firstName, lastName, nickName, city, country, dob });
}

const deleteUserProfile = async (id: number) => {
    return await axios.delete(`http://localhost:5000/up/${id}`);
}

export {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile
}