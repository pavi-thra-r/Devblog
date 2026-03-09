import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BlogPage from "./pages/BlogPage"

function App(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />

    {/* BLOG PAGE */}
    <Route path="/blog/:id" element={<BlogPage/>} />

   </Routes>

  </BrowserRouter>

 )

}

export default App