import "../src/App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./Helpers/routes"

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
       <Routes>
        {routes.map((route) => {
          return(
            <Route key={route.path} path={route.path} element={route.element} />
          )
        })}
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
