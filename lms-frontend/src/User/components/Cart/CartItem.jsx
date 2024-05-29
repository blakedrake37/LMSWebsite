import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Books from "../BookSlider/Books";
import {
  createBorrowDetail,
  deleteBorrowDetail,
  listBorrowDetails,
} from "../../../services/BorrowDetailService";
import { createBorrow } from "../../../services/BorrowService";
import { getAccount } from "../../../services/AccountService";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";

const CartItem = ({ book }) => {
  const [quantity, setQuantity] = React.useState();
  const [total, setTotal] = React.useState(0);
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {auth}=useSelector(store=>store)
  
    useEffect(()=>{
      if(jwt){
        dispatch(getUser(jwt))
      }
    },[jwt, auth.jwt])
  useEffect(() => {
    getBorrowDetails();
  });
  function getBorrowDetails() {
    listBorrowDetails()
      .then((response) => {
        if (response.data) {
          const filteredData = response.data.filter(
            (item) =>
              item.borrow.accountID === auth.user?.accountID &&
              item.bookItem.bookId === book.bookId &&
              item.bookItem.status === 0
          );
          setQuantity(filteredData.length);
          setBorrowDetails(filteredData);
          // console.log(filteredData)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const removeToCart = (event)=>{
    event.preventDefault()
    if(borrowDetails.length>0){
        const firstBorrowDetail = borrowDetails[0];
        deleteBorrowDetail(firstBorrowDetail.borrowDetailId).then(()=>{
            getBorrowDetails()
        }).catch(error =>{
            console.error(error);
        })
    }

  }
  const removeAllCart = (event)=>{
    event.preventDefault()
    if(borrowDetails.length>0){
        borrowDetails.map((borrowDetail)=>{
            deleteBorrowDetail(borrowDetail.borrowDetailId).then(()=>{
                getBorrowDetails()
            }).catch(error =>{
                console.error(error);
            })
        })
    }
  }
  const addToCart = (event) => {
    event.preventDefault()
    setBorrows(auth.user?.borrow)
    let bookItems = book.bookItems.filter((item) => item.status === 0);
    for (let item of bookItems) {
      let borrow = {
        accountID: auth.user?.accountID
      };
      createBorrow(borrow)
        .then((response) => {
        let filterBookItems = book.bookItems.find(bookItem => !borrowDetails.some(detail => detail.bookItem.bookItemId === bookItem.bookItemId));
        // borrowDetails.find(detail => borrows.some(borrow => borrow.borrowId !== detail.borrow.borrowId  && book.bookItems.bookItemId !== detail.bookItem.bookItemId ));
          let borrowDetail = {
            borrow: {
              borrowId: response.data.borrowId,
            },
            bookItem: {
              bookItemId: filterBookItems.bookItemId
            },
          };
        createBorrowDetail(borrowDetail)
            .then((response) => {
            console.log(response.data);
            })
            .catch((error) => {
            console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
  };
return (
    <>
        {borrowDetails.length > 0 && (
            <div className="p-5 shadow-lg border rounded-md">
                <div className="flex items-center">
                    <div className="w-[5rem] h-[5rem] lg:w-[10rem] lg:h-[10rem]">
                        <img
                            src={book.picture}
                            alt=""
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="ml-5 space-y-1">
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-gray-500">
                            {book.categories.length > 0
                                ? book.categories
                                        .map((category) => category.categoryName)
                                        .join(", ")
                                : "No categories"}
                        </p>
                        <p className="text-gray-500 mt-2">
                            {book.authors.length > 0
                                ? book.authors.map((author) => author.authorName).join(", ")
                                : "No authors"}
                        </p>
                    </div>
                </div>
                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-2">
                        <IconButton onClick={removeToCart}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="py-1 px-7 border rounded-sm">{quantity}</span>
                        <IconButton
                            onClick={addToCart}
                            sx={{ color: "RGB(145 85 253)" }}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button onClick={removeAllCart} sx={{ color: "RGB(145 85 253)" }}>Remove</Button>
                    </div>
                </div>
            </div>
        )}
    </>
);
};

export default CartItem;
