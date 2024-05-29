import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getBook, listBooks } from '../../../services/BookService'
import OrderCard from './OrderCard'
import { getUser } from '../../../State/Auth/Action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listBorrowDetails } from '../../../services/BorrowDetailService'

const orderStatus=[
    {label: "Pending", value:"pending"},
    {label: "Borrowed", value:"borrowed"},
    {label: "Returned", value:"returned"},
    {label: "Canceled", value:"canceled"},
]

const Order = () => {
    const [borrows, setBorrows] = useState([]);
    const [borrowDetails, setBorrowDetails] = useState([]);
    // const [book, setBook] = useState(null);
    const [books, setBooks] = useState([])
    const navigator = useNavigate();
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {auth}=useSelector(store=>store)
    
    useEffect(()=>{
        if(jwt){
          dispatch(getUser(jwt))
        }
      },[jwt, auth.jwt])

    useEffect(()=>{
        getBooks()
    }, [])
    function getBooks() {
        setBorrows(auth.user?.borrow)
        // console.log(auth.user?.borrow)
        listBorrowDetails()
            .then((response) => {
                setBorrowDetails(response.data);
                // console.log(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
        borrowDetails.filter((item) => item.status  !== 0)
        .map((borrowDetail)=>{
            borrows.map((borrow)=>{
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

    }
  return (
    <div className='px-5 lg:px-20'>
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={2.5}>
                <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                    <h1 className='font-bold text-lg'>Filter</h1>
                    <div className='space-y-4 mt-10'> 
                        <h1 className='font-semibold'>
                            STATUS
                        </h1>
                        {orderStatus.map((option)=><div className='flex items-center'>
                            <input defaultValue={option.value} type="checkBox" className='h-4 w-4 border-gray-300
                            text-indigo-600 focus:ring-indigo-500' />    
                            <label htmlFor="
                            {option.value}" className='ml-3 text-sm text-gray-600'>{option.label}</label>
                        </div>)}
                    </div>
                </div>
            </Grid>
            <Grid item xs={9}>
                <div>

                    <div className='space-y-5'>
                        {books.map((book)=>{
                            {console.log(book)}
                            <OrderCard book={book} status={1}/>
                        })}


                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Order