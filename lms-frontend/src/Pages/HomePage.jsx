import React from "react";
import MainCarousel from "../User/Home/Main";
import HomeSectionCarosel from "../User/HomeSectionCarosel/HomeSectionCarosel";
import Hero from "../User/components/Hero/Hero";
import RecommendBook from "../User/components/RecommendBook/RecommendBook";
import Books from "../User/components/BookSlider/Books";
import Book from "../User/components/Book/Book";
import Footer from "../User/components/Footer";
import BookDetail from "../User/components/BookDetail/BookDetail";
import Cart from "../User/components/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "../User/components/Order/Order";

const HomePage = () => {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Hero />
        {/* <Order></Order> */}
        {/* <Books></Books> */}
        <Book/>
        {/* <MainCarousel/> */}
        <RecommendBook/>
        {/* <Books/> */}

        {/* <BookDetail/> */}
        {/* <Cart/> */}
        {/* <Routes> */}
        {/* <Order/> */}
          {/* <Route path="/" element={<Checkout />}></Route> */}
        {/* </Routes> */}
        <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
          {/* <HomeSectionCarosel/>
            <HomeSectionCarosel/>
            <HomeSectionCarosel/>
            <HomeSectionCarosel/> */}
        </div>
        {/* <Footer /> */}
      {/* </BrowserRouter> */}
    </div>
  );
};

export default HomePage;
