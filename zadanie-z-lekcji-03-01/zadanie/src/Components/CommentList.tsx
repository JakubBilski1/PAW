import { useComments } from "../services/useComments";

interface CommentListProps {
    postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
    const { data: comment, isLoading: loading, error } = useComments(postId);
    return (
        <>
            <h2>Comments</h2>
            {loading 
                ? <p>Loading...</p>
                : error
                    ? <p>error occured</p>
                    : (
                        <div>
                            {comment?.map(comment => (
                                <div key={comment.id}>
                                    <h3>{comment.email}</h3>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
        </>
    )
}