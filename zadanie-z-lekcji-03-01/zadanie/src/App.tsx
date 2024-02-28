import "../src/App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./Helpers/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App(): JSX.Element {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return(
              <Route key={route.path} path={route.path} element={route.element} />
            )
          })}
        </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
