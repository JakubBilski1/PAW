import { useQuery } from "@tanstack/react-query";
import { Comment } from "../types";

export const getComments = async (postId: number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((data) => data as Comment[]);
}

export const useComments = (postId: number) => {
    return useQuery<Comment[]>({
        queryKey: ["comments"],
        queryFn: () => getComments(postId)
    })
}