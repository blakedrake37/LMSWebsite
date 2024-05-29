import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { createBorrowDetail, listBorrowDetails, updateBorrowDetail } from "../../../services/BorrowDetailService";
import { getBook } from "../../../services/BookService";
import { getAccount } from "../../../services/AccountService";
import { useNavigate } from "react-router-dom";
import { createBorrow, updateBorrow } from "../../../services/BorrowService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";
import { getBookItem, updateBookItem } from "../../../services/BookItemService";

const Cart = () => {

    const [borrows, setBorrows] = useState([]);
    const [borrowDetails, setBorrowDetails] = useState([]);
    const [books, setBooks] = useState([]);
    const navigator = useNavigate();
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {auth}=useSelector(store=>store)
    
      useEffect(()=>{
        if(jwt){
          dispatch(getUser(jwt))
        }
      },[jwt, auth.jwt])
    useEffect(() => {
        getBooks()

    },);

    function getBorrow(){
      borrowDetails.map((borrowDetail) => {
        getBookItem(borrowDetail.bookItem.bookItemId).then((response)=>{
          console.log(response.data)
          response.data.status = 1;
          updateBookItem(response.data.bookItemId, response.data).then((response)=>{
            console.log(response.data)
          }).catch((error)=>{
            console.log(error)
          
          })
        }).catch((error)=>{
          console.log(error)
        
        })
        borrowDetail.status = 1
        borrowDetail.bookItem
        updateBorrowDetail(borrowDetail.borrowDetailId, borrowDetail).then((response)=>{
          console.log(response.data);
          // navigator("/order");
        }).catch((error)=>{
          console.log(error)

        })
      });
      navigator("/order");
    }

    function getBooks() {
        setBorrows(auth.user?.borrow)
        // console.log(auth.user?.borrow)
        listBorrowDetails()
            .then((response) => {
                setBorrowDetails(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        borrowDetails.filter((item) => item.status  === 0)
        .map((borrowDetail)=>{
            borrows?.map((borrow)=>{
                if(borrow.borrowId==borrowDetail.borrow.borrowId){
                    getBook(borrowDetail.bookItem.bookId).then((response)=>{
                        setBooks((prevBooks) => {
                            if (!prevBooks.some((book) => book.bookId === borrowDetail.bookItem.bookId)) {
                                return [...prevBooks, response.data];
                            } else {
                                return prevBooks;
                            }
                            });
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            })

        })
        // console.log(borrowDetails);
        // console.log("borrow", borrows)
        // console.log("books", books)
    }

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
            {books.map((item)=> <CartItem book={item}/>)}
          {/* <CartItem /> */}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="px-5 mt-5">
            <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={getBorrow}
                  >
                    BORROW
                  </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
