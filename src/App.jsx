import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signup"
import Login from "./pages/login"
import Main from "./pages/main"
import Home from "./pages/home"
import Docs from "./pages/docs"
import About from "./pages/about"
import { ToastWrapper } from './utils';


function App() {
  return (
    <div>
      <ToastWrapper />
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
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
