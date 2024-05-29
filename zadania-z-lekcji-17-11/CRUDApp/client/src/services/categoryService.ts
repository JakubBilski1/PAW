import axios from "axios";

const getCategories = async() => {
    try{
        return axios.get('http://localhost:5000/c');
    }catch(err){
        console.log(err);
    }
}

const createCategory = async(name: string, id: number) => {
    try{
        return axios.post(`http://localhost:5000/c/${id}`, {
            name
        });
    }catch(err){
        console.log(err);
    }
}

const deleteCategory = async(id: number) => {
    try{
        return axios.delete(`http://localhost:5000/c/${id}`);
    }catch(err){
        console.log(err);
    }
}

const updateCategory = async(id: number, name: string, postId: number) => {
    try{
        return axios.put(`http://localhost:5000/c/${id}`, {
            name, postId
        });
    }catch(err){
        console.log(err);
    }
}

export {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
}