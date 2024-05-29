import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'

const AdminRouters = () => {
  return (
    <div>
        <Routes>
            <Route path="/*" element={<Admin />}></Route>
            {/* <Route path="/login" element={<Admin />}></Route>
            <Route path="/register" element={<Admin />}></Route>
            <Route path="/cart" element={<Admin />}></Route>
            <Route path="/books" element={<Admin />}></Route>
            <Route path="/books/:id" element={<Admin />}></Route>
            <Route path="/order" element={<Admin />}></Route> */}
        </Routes>
    </div>
  )
}

export default AdminRouters