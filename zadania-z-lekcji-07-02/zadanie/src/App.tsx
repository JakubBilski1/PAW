import "../src/App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./helpers/routes"
import NavBar from "./components/NavBar/NavBar"
import Header from "./components/Header/Header"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  background-color: #656565;
  height: 60vh;
  color: white;
`

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Main>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {routes.map((route) =>(
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </Main>
    </>
  )
}

export default App
