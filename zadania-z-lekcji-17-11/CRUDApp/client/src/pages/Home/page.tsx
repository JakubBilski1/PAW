import styled from 'styled-components';
import CategoryBox from '../../components/CategoryBox';
import PostBox from '../../components/PostBox';
import UsersBox from '../../components/UsersBox';

const StyledHome = styled.div`
  height: 97%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 49%;
  height: 100%;
`;

const RightBox = styled.div`
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Home() {
  return (
    <StyledHome>
      <LeftBox>
        <UsersBox />
      </LeftBox>
      <RightBox>
        <CategoryBox />
        <PostBox />
      </RightBox>
    </StyledHome>
  );
}

export default Home;
