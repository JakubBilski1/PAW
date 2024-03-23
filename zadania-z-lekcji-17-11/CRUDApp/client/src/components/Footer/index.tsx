import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 5vh;
  background-color: #333;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return (
    <StyledFooter>
      &copy; 2024 CRUDApp by Jakub Bilski
    </StyledFooter>
  );
}

export default Footer;
