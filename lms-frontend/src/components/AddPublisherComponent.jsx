import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPublisher, getPublisher, updatePublisher } from '../services/PublisherService';


const AddPublisherComponent = () => {
    const [publisherName, setPublisherName] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        publisherName: ''
    })
    const navigator = useNavigate();
    useEffect(()=>{
        if(id){
            getPublisher(id).then((response) => {
                setPublisherName(response.data.publisherName)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id])
    const savePublisher = (event) =>{
        event.preventDefault();
        if(validateForm()){
            let publisher = {
                publisherName: publisherName
            }
            console.log(publisher)
            if(id){
                updatePublisher(id, publisher).then(response => {
                    console.log(response.data)
                    navigator('/publishers')
                }).catch(error => {
                    console.log(error)
                })
            }else{
                createPublisher(publisher).then((response) =>{
                    console.log(response.data)
                    navigator('/publishers')
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
    function validateForm(){
        const errorsCopy = {... errors}
        let formIsValid = true
        if(publisherName.trim()){
            errorsCopy.publisherName = '';
        }else{
            errorsCopy.publisherName = 'Publisher Name is required';
            formIsValid = false
        }
        setErrors(errorsCopy)
        return formIsValid
    }
    function pageTitle(){
        return id ? 'Update Publisher' : 'Add Publisher'
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
                <label className="form-label">Publisher Name:</label>
                <input
                  placeholder="Publisher Name"
                  name="publisherName"
                  className={`form-control ${ errors.publisherName ? 'is-invalid' : ''}`}
                  value={publisherName}
                  onChange={(event) => setPublisherName(event.target.value)}
                />
                {errors.publisherName && <div className="invalid-feedback">{errors.publisherName}</div>}
                
              </div>
              <button className="btn btn-success" onClick={savePublisher}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPublisherComponent