import styled from "styled-components"

const HeaderStyle = styled.header`
  background-color: #454545;
  height: 20vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Header() {
  return (
    <HeaderStyle>
      <h1>heder</h1>
    </HeaderStyle>
  )
}

export default Header