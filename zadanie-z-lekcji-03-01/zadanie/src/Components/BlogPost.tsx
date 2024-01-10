import { Post } from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";

export default function BlogPost(){
    const { id } = useParams<{id: string}>();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json() as Promise<Post>)
            .then((data) => setPost(data))
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    return (
        <>
            {loading && <p>Loading...</p>}
            {error ? <p>{error}</p> :
            <ul>
                {post && (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <CommentList postId={post.id} />
                    </li>
                )}
            </ul>}
        </>
    )
}