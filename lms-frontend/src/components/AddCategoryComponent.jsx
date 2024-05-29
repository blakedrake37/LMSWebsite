import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getCategory, updateCategory } from '../services/CategoryService';

const AddCategoryComponent = () => {
    const [categoryName, setCategoryName] = useState('');
    const {id} = useParams();
    const [errors, setErrors] = useState({
        categoryName: '',
    });
    const navigator = useNavigate();
    useEffect(() => {
        getCategory(id).then((response) => {
            setCategoryName(response.data.categoryName)
        }).catch(error => {
            console.log(error)
        })
    }, [id])
    const saveCategory = (event) => {
        event.preventDefault();
        if(validateForm()){
            let category = {
                categoryName: categoryName
            }
            console.log(category)
            if(id){
                updateCategory(id, category).then(response => {
                    console.log(response.data)
                    navigator('/categories')
                }).catch(error => {
                    console.log(error)
                })
            }else{
                createCategory(category).then((response) =>{
                    console.log(response.data)
                    navigator('/categories')
                }).catch(error => {
                    console.log(error)
                }) 
            }
        }
    }

    function validateForm(){
        const errorsCopy = {... errors}
        let formIsValid = true
        if(categoryName.trim()){
            errorsCopy.categoryName = '';
        }else{
            errorsCopy.categoryName = 'Category Name is required';
            formIsValid = false
        }
        setErrors(errorsCopy)
        return formIsValid
    }

    function pageTitle(){
        return id ? 'Update Category' : 'Add Category'
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
                <label className="form-label">Category Name:</label>
                <input
                  placeholder="Category Name"
                  name="categoryName"
                  className={`form-control ${ errors.categoryName ? 'is-invalid' : ''}`}
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                />
                {errors.categoryName && <div className="invalid-feedback">{errors.categoryName}</div>}
                
              </div>
              <button className="btn btn-success" onClick={saveCategory}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryComponent