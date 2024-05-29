import React, { useEffect, useState } from 'react'
import { listBooks } from '../services/BookService';
import { useNavigate } from 'react-router-dom';



const ListBookComponent = () => {
  const [books, setBooks] = useState([])  
  const navigator = useNavigate();
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
  return (
    <div className='container'>
        <h2 className='text-center' >List Book</h2> 
        {/* <button type="button" class="btn btn-primary" onClick={registerAccount}>Register</button> */}
        
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {

                    books.map(book =>
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>
                                <img src={book.picture} alt="Book Image" width="200" height="350"></img>
                            </td>
                            <td>
                                <button className='btn btn-info'>Update</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListBookComponent