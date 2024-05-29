import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listAuthors } from '../services/AuthorService';

const ListAuthorComponent = () => {
    const [authors, setAuthors] = useState([]);
    const navigator = useNavigate();
    useEffect(() => {
        getAllAuthors();
    }, []) 
    function getAllAuthors(){
        listAuthors().then((response) => {
            setAuthors(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addAuthor(){
        navigator('/add-author');
    }
    function updateAuthor(id){
        navigator(`/update-author/${id}`);
    }
  return (
    <div className='container'>
        <h2 className='text-center' >Publisher List</h2> 
        <button type="button" className="btn btn-primary" onClick={addAuthor}>Add Author</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Author Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    authors.map(
                        author =>
                        <tr key={author.authorId}>
                            <td>{author.authorId}</td>
                            <td>{author.authorName}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateAuthor(author.authorId)}>Update</button>
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

export default ListAuthorComponent