import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"
import PrivateRoutes from "./security/PrivateRoutes"
import AdminRoutes from "./security/AdminRoutes"
import CreatePost from "./posts/CreatePost"
import Post from "./posts/Post"
import EditPost from "./posts/EditPost"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"
import Error500 from "./error/Error500"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/post-detail/:slug" element={<Post />} />
          <Route path="/search" element={<Search />} />
          <Route path="/err" element={<Error500 />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="edit-post/:postId" element={<EditPost />} />
          </Route>

        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  )
}

export default App