import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { usePost } from "../services/usePost";

export default function BlogPost(){
    const { id } = useParams<{id: string}>();
    const { data: post, isLoading: loading, error } = usePost(id || "");
    return (
        <>
            {loading && <p>Loading...</p>}
            {error ? <p>error occured</p> :
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