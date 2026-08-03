
import Navbar from "./components/Navbar"
import Home from "./pages/Home" 
import NotFound from "./pages/NotFound"
import Users from "./components/users/Users"
import Account  from "./components/Account/Accounts"
import { Routes, Route } from "react-router"
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="Account" element={<Account />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App