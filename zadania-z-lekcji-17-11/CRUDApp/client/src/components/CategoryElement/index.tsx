import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { createCategory } from '../../services/categoryService';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CategoryElement = () => {
  const [postId, setPostId] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    try {
        const response = await createCategory(categoryName, Number(postId))
        if(response?.status === 200){
            alert(`Created category ${categoryName} realted to post ${postId}`)
        }
    }catch(error){
        console.error(error);
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            placeholder='Post id...'
            id="postId"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder='Category name...'
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormGroup>
        <Button type="button" onClick={(e)=>handleSubmit(e)}>Create</Button>
      </Form>
    </FormContainer>
  );
}

export default CategoryElement;
