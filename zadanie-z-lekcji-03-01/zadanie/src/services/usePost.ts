import { useQuery } from "@tanstack/react-query"
import { Post } from "../types"

export const getPost = async (id: string) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => data as Post)
}

export const usePost = (id: string) => {
    return useQuery<Post>({
        queryKey: ["posts"],
        queryFn: () => getPost(id)
    })
}