import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Cart from "../User/components/Cart/Cart";

import Footer from "../User/components/Footer";
import Book from "../User/components/Book/Book";
import BookDetail from "../User/components/BookDetail/BookDetail";
import Hero from "../User/components/Hero/Hero";
import ListAccountComponent from "../components/ListAccountComponent";
import LoginForm from "../User/Auth/LoginForm";
import RegisterForm from "../User/Auth/RegisterForm";
import Order from "../User/components/Order/Order";
import Navbar from "../User/components/NavBar";
const UserRouters = () => {
  return (
    <div>
      <div>
  
        <Navbar></Navbar>
      </div>
      <Routes>
  
        {/* <Route path="/" element={<Hero />}></Route> */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/:levalOne/:levalTwo/:levalThree"
          element={<Book />}
        ></Route>
        <Route path="/books/:id" element={<BookDetail />}></Route>
        <Route path="/order" element={<Order />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserRouters;
