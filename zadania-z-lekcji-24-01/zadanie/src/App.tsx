import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contact from "./pages/contact/page"
import Home from './pages/home/page'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
