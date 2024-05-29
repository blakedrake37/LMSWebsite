import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { listBooks } from "../../../services/BookService";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import { listBorrowDetails } from "../../../services/BorrowDetailService";

const OrderCard = ({ book, status }) => {
    // const [book, setBook] = useState(null);
    useEffect(()=>{
        // getBook(borrowDetail?.borrow.bookId).then((response)=>{
        //     console.log(response.data)
        //     // setBook(response.data)
        // }).catch((error)=>{
        //     console.log(error)
        // })
    
    })
  return (
    <div className="p-5 shadow-md shadow-black hover:shadow-2xl border">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={book.picture}
              alt={book.title}
            />
            <div className="ml-5 space-y-2">
              <p className="">{book.title}</p>
              <p className="opacity-50 text-xs font-semibold">
                {book.categories.length > 0
                  ? book?.categories
                      .map((category) => category.categoryName)
                      .join(", ")
                  : "No categories"}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                {book.authors.length > 0
                  ? book?.authors.map((author) => author.authorName).join(", ")
                  : "No authors"}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p className="font-semibold"></p>
        </Grid>
        <Grid item xs={4}>
          {status === 1 && (
            <div>
              {" "}
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-gray-600 mr-2 text-sm"
                />
                <span>Pending</span>
              </p>
              <p className="text-xs">Your books is pending</p>
            </div>
          )}
          {status == 2 && (
            <div>
              {" "}
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-gray-600 mr-2 text-sm"
                />
                <span>Borrowed</span>
              </p>
              <p className="text-xs">Your books is borrowed</p>
            </div>
          )}
          {status == 3 && (
            <div>
              {" "}
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-gray-600 mr-2 text-sm"
                />
                <span>Returned</span>
              </p>
              <p className="text-xs">Your books is returned</p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
