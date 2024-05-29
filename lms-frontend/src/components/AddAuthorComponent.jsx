import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createAuthor, getAuthor, updateAuthor } from '../services/AuthorService';

const AddAuthorComponent = () => {
    const [authorName, setAuthorName] = useState('');
    const {id} = useParams();
    const [errors, setErrors] = useState({
        authorName: ''
    })
    const navigator = useNavigate();
    useEffect(() =>{
        getAuthor(id).then((response) => {
            setAuthorName(response.data.authorName)
        }).catch(error => {
            console.log(error)
        })
    }, [id])
    const saveAuthor = (event) => {
        event.preventDefault();
        if(validateForm()){
            let author = {
                authorName: authorName
            }
            console.log(author)
            if(id){
                updateAuthor(id, author).then(response => {
                    console.log(response.data)
                    navigator('/authors')
                }).catch(error => {
                    console.log(error)
                })
            }else{
                createAuthor(author).then((response) =>{
                    console.log(response.data)
                    navigator('/authors')
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
    function validateForm(){
        const errorsCopy = {... errors}
        let formIsValid = true
        if(authorName.trim()){
            errorsCopy.authorName = '';
        }else{
            errorsCopy.authorName = 'Author Name is required';
            formIsValid = false
        }
        setErrors(errorsCopy)
        return formIsValid
    }
    function pageTitle(){
        return id ? 'Update Author' : 'Add Author'
    }
  return (
    <div className="container">
    <br></br>
    <br/>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{pageTitle()}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Author Name:</label>
                <input
                  placeholder="Author Name"
                  name="authorName"
                  className={`form-control ${ errors.authorName ? 'is-invalid' : ''}`}
                  value={authorName}
                  onChange={(event) => setAuthorName(event.target.value)}
                />
                {errors.authorName && <div className="invalid-feedback">{errors.authorName}</div>}
                
              </div>
              <button className="btn btn-success" onClick={saveAuthor}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAuthorComponent