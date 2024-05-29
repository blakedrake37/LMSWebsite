import React from 'react'
import Book1 from '../../../assets/books/book1.jpg'
import './BookCard.css'
import { useNavigate } from 'react-router-dom'

const BookCard = ({book}) => {
    const navigator=useNavigate()
  return (
    <div onClick={()=>navigator(`/books/${book.bookId}`)} className='bookCard w-[15rem] m-3 transition-all cursor-pointer'>
        <div className="h-[20rem]">
            <img className="object-cover object-left-top w-full h-full" src={book.picture} alt="" />

        </div>
        <div className="textPart bg-white p-3">
            <div>
                <p className='font-bold opacity-60'>{book.title}</p>
                <p className='text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2'>{book.authors.length > 0 ? book.authors.map(author => author.authorName).join(', ') : 'No authors'}</p>
            </div>
            <div className='flex items-center space-x-2'>
                {/* <p className='font-semibold'>7$</p> */}
                {/* <p className='line-through opacity-50'>1999$</p> */}
                {/* <p className='text-green-600 font-semibold'>70% off</p> */}
            </div>
        </div>
    </div>
  )
}

export default BookCard