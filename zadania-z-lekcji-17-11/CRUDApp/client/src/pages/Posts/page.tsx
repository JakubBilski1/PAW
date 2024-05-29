import styled from 'styled-components';
import PostForm from '../../components/PostForm';
import { deletePost, usePosts } from '../../services/postServices';
import { useState } from 'react';
import Modal from '../../components/Modal';
import CategoryBox from '../../components/CategoryBox';
import CategoryElement from '../../components/CategoryElement';

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
    padding: 0;
  }
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const PostContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PostTitle = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const AuthorInfo = styled.p`
  color: #666;
  margin-bottom: 5px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const Category = styled.div`
  background-color: #f2f2f2;
  color: #666;
  padding: 10px 10px;
  border-radius: 4px;
  margin-right: 5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  width: calc(100% - 20px);
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const VerticalPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  gap: 5px;
  border-top: 1px solid #ccc;
  padding: 20px;

  &:first-child {
    border-top: none;
  }
`;

function Posts() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: posts, error, isLoading } = usePosts();
  const handleDelete = async(id: number) => {
    try {
      const response = await deletePost(id)
      if(response?.status === 200) {
        alert('Post deleted successfully');
      }
    }catch(err) {
      console.log(err);
    }
  };
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
        {posts && posts.filter(post=>post.published).map(post => (
          <PostContainer key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <AuthorInfo>Author: {post.user.email}, id: {post.user.id}</AuthorInfo>
            <p>{post.content}</p>
            <CategoryContainer>
              {post.categories.map(category => (
                <Category key={category.category.id}>{category.category.name}</Category>
              ))}
            </CategoryContainer>
            <ButtonsContainer>
              <Button onClick={()=>setShowModal(true)}>Edit</Button>
              {showModal && <Modal setShowModal={setShowModal} children={
                <PostForm postId={post.id} userId={post.user.id.toString()} title={post.title} content={post.content} categories={post.categories} images={post.photos} update={true}/>
              } />}
              <Button onClick={()=>handleDelete(post.id)}>Delete</Button>
            </ButtonsContainer>
          </PostContainer>
        ))}
      </Panel>
      <Panel>
        <VerticalPanel>
        <Title>Categories</Title>
        <CategoryElement />
        </VerticalPanel>
        <VerticalPanel>
          <Title>Images</Title>
        </VerticalPanel>
      </Panel>
    </Container>
  );
}

export default Posts;
