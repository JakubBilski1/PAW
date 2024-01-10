import { useEffect, useState } from "react";
import { Comment } from "../types";

interface CommentListProps {
    postId: number;
}

export default function CommentList({ postId }: CommentListProps) {

    const [comment, setComment] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => response.json() as Promise<Comment[]>)
            .then((comment) => {
                setComment(comment);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [postId]);
    return (
        <>
            {loading && <p>Loading Comments...</p>}
            {error ? <p>{error}</p> :
                <ul>
                    {comment.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <h2>{comment.name}</h2>
                                <p>{comment.body}</p>
                            </li>
                        )
                    })}
                </ul>}
        </>
    )
}