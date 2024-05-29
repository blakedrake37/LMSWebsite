import React, { useEffect, useState } from 'react'
import { listBooks } from '../../services/BookService'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const Main = () => {
    const [books, setBooks] = useState([])  


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
    const items = books.map((item)=> <img className='cursor-pointer' role='presentation' src={item.picture} alt=""></img>)
    .slice(0, 5)
  return (
    <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
    />
  )
}

export default Main