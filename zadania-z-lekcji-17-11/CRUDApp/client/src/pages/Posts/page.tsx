import styled from 'styled-components';
import PostForm from '../../components/PostForm';
import { usePosts } from '../../services/postServices';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Panel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

function Posts() {
  const { data: posts, error, isLoading } = usePosts();
  console.log(posts);
  return (
    <Container>
      <Panel>
        <Title>Create Post Here:</Title>
        <PostForm />
      </Panel>
      <Panel>
        <Title>Our Posts:</Title>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {posts && posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </Panel>
      <Panel>
        <Title>Control Existing Posts:</Title>
      </Panel>
    </Container>
  );
}

export default Posts;
