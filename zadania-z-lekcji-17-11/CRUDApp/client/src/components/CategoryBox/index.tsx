import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios"; // Import AxiosResponse
import Modal from "../Modal";
import { Category } from "../../types"; // Załóżmy, że masz plik zdefiniowany z interfejsem Category

const CategoryBoxStyle = styled.div`
  background-color: #4caf50;
  color: black;
  border-radius: 15px;
  height: 49%;
  overflow: scroll;
  overflow-y: none;
  padding: 10px;
`;

const CategoryListItem = styled.li`
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Rounded corners */
  padding: 8px 16px; /* Padding */
  margin-bottom: 8px; /* Bottom margin */
  display: flex; /* Make it a flex container */
  justify-content: space-between; /* Space between items */
  align-items: center; /* Center vertically */
`;

const Button = styled.button`
  background-color: #008cba; /* Blue */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 8px;
`;

function CategoryBox() {
  const [categories, setCategories] = useState<Category[]>([]); // Popraw typ kategorii
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for input field value

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: AxiosResponse<Category[]> = await getCategories(); // Popraw typ odpowiedzi
        if (response?.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = async (categoryId: number) => {
    const editedValue = inputRef.current?.value;
    if (!editedValue) {
      return alert("Please enter a value");
    }
    try {
      const response: AxiosResponse<Category> = await updateCategory(categoryId, editedValue); // Popraw typ odpowiedzi
      if (response?.status === 200) {
        alert("Category updated successfully");
        setCategories(categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, name: editedValue };
          }
          return category;
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const response: AxiosResponse<void> = await deleteCategory(categoryId); // Popraw typ odpowiedzi
      if (response?.status === 200) {
        alert("Category deleted successfully");
        setCategories(categories.filter(category => category.id !== categoryId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CategoryBoxStyle>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <CategoryListItem key={category.id}>
            {category.name}
            <div>
              <Button onClick={() => setShowModal(true)}>Edit</Button>
              {showModal && (
                <Modal
                  setShowModal={setShowModal}
                  children={
                    <div>
                      <h2>Edit Category</h2>
                      <input
                        type="text"
                        defaultValue={category.name}
                        ref={inputRef}
                      />
                      <Button onClick={() => handleEdit(category.id)}>
                        Save
                      </Button>
                    </div>
                  }
                />
              )}
              <Button onClick={() => handleDelete(category.id)}>
                Delete
              </Button>
            </div>
          </CategoryListItem>
        ))}
      </ul>
    </CategoryBoxStyle>
  );
}

export default CategoryBox;
