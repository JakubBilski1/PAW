import { Link } from 'react-router-dom'
import { usePosts } from '../../services/usePosts'

function Blog(): JSX.Element {
  const { data: post, isLoading: loading, error } = usePosts()
  return (
    <>
      {loading && <p>Loading...</p>}
      {error ? <p>error occured</p> :
      <ul>
        {post?.map((post) => {
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <Link to={`/blog/${post.id}`}>Read more</Link>
            </li>
          )
        })}
      </ul>}
    </>
  )
}

export default Blog
