import styled from 'styled-components';
import { createPost } from '../../services/postServices';
import { useState, ChangeEvent, FormEvent } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface FormData {
    userId: string;
    title: string;
    content: string;
    categories: string[];
    images: string[];
  }

function PostForm() {
    const [formData, setFormData] = useState<FormData>({
        userId: '',
        title: '',
        content: '',
        categories: [],
        images: [],
      });
    
      const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const filesArr: string[] = []
          const filesArray = Array.from(e.target.files);
          filesArray.map((file: File) => {
            let fileString = file.name
            filesArr.push(fileString)
          });
          setFormData({
            ...formData,
            images: filesArr,
          });
        }
      };
    
      const handleCategoriesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value.split(','),
        });
      }
    
      const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
          const response = await createPost(Number(formData.userId), formData.title, formData.content, true, formData.categories, formData.images);
          if(response?.status === 201){
            alert('Post created successfully');
          }else{
            alert('An error occurred');
          }
        }catch(err){
          console.log(err);
        }
      };
    
  return (
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>User ID:</Label>
            <Input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
            />
        </FormGroup>
        <FormGroup>
            <Label>Title:</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
        </FormGroup>
        <FormGroup>
            <Label>Content:</Label>
            <TextArea
              rows={4}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
        </FormGroup>
        <FormGroup>
            <Label>Categories:</Label>
            <Input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleCategoriesChange}
            />
        </FormGroup>
        <FormGroup>
            <Label>Upload Image(s):</Label>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
            />
        </FormGroup>
        <Button type="submit">Submit</Button>
    </Form>
  )
}

export default PostForm
