
import Navbar from "./components/Navbar"
import Home from "./pages/Home" 
import NotFound from "./pages/NotFound"
import Users from "./components/users/Users"
import { Routes, Route } from "react-router"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="notFound" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App