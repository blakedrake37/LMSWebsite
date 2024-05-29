import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import AliceCarousel from "react-alice-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import { listBooks } from "../../services/BookService";

const HomeSectionCarosel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getAllBooks()
  }, [])
  function getAllBooks(){
    listBooks().then((response) => {
        setBooks(response.data);
    }).catch(error => {
        console.error(error);
    })
  }
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  const items = books.slice(0,10).map((item) => (
    <HomeSectionCard book={item}/>
  ));
  return (
    <div className="border">
        <h2 className="text-2xl font-extrabold dark:text-gray-800 py-5">Books</h2>
      <div className="relative p-5 border">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== items.length - 5 && 
          <Button
            variant="contained"
            className="z-50"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        }
        {activeIndex !== 0 && <Button
          variant="contained"
          className="z-50 bg-[]"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
        </Button>}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
