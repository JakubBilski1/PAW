import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './helpers/routes'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const MainStyle = styled.main`
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <MainStyle>
          <BrowserRouter>
            <Routes>
              {routes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))}
            </Routes>
          </BrowserRouter>
        </MainStyle>
        <Footer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
