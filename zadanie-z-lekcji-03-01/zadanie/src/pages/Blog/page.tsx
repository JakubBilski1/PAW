import { useEffect, useState } from 'react'
import { Post } from '../../types'
import { Link } from 'react-router-dom'

function Blog(): JSX.Element {
  const [post, setPost] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json() as Promise<Post[]>)
      .then((data) => {
        setPost(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [])
  return (
    <>
      {loading && <p>Loading...</p>}
      {error ? <p>{error}</p> :
      <ul>
        {post.map((post) => {
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
