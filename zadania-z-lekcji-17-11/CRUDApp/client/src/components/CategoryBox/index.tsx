import styled from "styled-components";

const CategoryBoxStyle = styled.div`
  background-color: #4CAF50;
  color: white;
  border-radius: 15px;
  height: 49%;
`;

function CategoryBox() {
    return (
      <CategoryBoxStyle>
        Categories
      </CategoryBoxStyle>
    );
}

export default CategoryBox;