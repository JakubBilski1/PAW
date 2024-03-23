import styled from "styled-components";

const PostBoxStyle = styled.div`
  background-color: #f44336;
  color: white;
  border-radius: 15px;
  height: 49%;
`;

function PostBox() {
    return (
      <PostBoxStyle>
        Posts
      </PostBoxStyle>
    );
}

export default PostBox