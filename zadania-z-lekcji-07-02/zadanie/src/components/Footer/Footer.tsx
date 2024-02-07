import styled from "styled-components"

const FooterStyle = styled.footer`
  background-color: #454545;
  height: 20vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Footer() {
  return (
    <FooterStyle>
      <p>©Copyright Jakub Bilski 2024</p>
    </FooterStyle>
  )
}

export default Footer
