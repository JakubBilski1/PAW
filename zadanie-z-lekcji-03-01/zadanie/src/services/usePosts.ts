import { useQuery } from "@tanstack/react-query"
import { Post } from "../types"

export const getPosts = async () => {
    return await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => data as Post[])
}

export const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: getPosts
    })
}