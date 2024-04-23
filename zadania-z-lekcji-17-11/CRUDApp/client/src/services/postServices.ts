import { useQuery } from "@tanstack/react-query";
import { Post } from "../types/Post";
import axios from "axios";

const getPosts = async () => {
    return await fetch('http://localhost:5000/p')
        .then(res => res.json())
        .then(data => data)
}

const getPost = async (id: number) => {
    return await fetch(`http://localhost:5000/p/${id}`)
        .then(res => res.json())
        .then(data => data)
}

const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: getPosts
    });
}

const usePost = (id: number) => {
    return useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getPost(id)
    });
}

const createPost = async(userId: number, title: string, content: string, published: boolean, categories: string[], photos: string[]) => {
    try{
        return axios.post('http://localhost:5000/p', {
            userId,
            title,
            content,
            published,
            categories,
            photos
        });
    }catch(err){
        console.log(err);
    }
}

const updatePost = async(id: number, userId: number, title: string, content: string, published: boolean, categories: string[], photos: string[]) => {
    try{
        return axios.put(`http://localhost:5000/p/${id}`, {
            userId,
            title,
            content,
            published,
            categories,
            photos
        });
    }catch(err){
        console.log(err);
    }
}

const deletePost = async(id: number) => {
    try{
        return axios.delete(`http://localhost:5000/p/${id}`);
    }catch(err){
        console.log(err);
    }
}

export {
    usePosts,
    usePost,
    createPost,
    updatePost,
    deletePost
}