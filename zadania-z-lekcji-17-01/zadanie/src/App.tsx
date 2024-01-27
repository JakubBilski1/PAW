import "../src/App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./helpers/routes"
import NavBar from "./components/NavBar/NavBar"
import Header from "./components/Header/Header"

function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {routes.map((route) =>(
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
