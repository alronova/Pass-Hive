import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Docs from "./pages/docs"
import About from "./pages/about"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
