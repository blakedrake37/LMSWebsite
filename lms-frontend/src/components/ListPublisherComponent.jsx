import React, { useEffect, useState } from 'react'
import { listPublishers } from '../services/PublisherService'
import { useNavigate } from 'react-router-dom'

const ListPublisherComponent = () => {
    const [publishers, setPublishers] = useState([])
    const navigator = useNavigate();
    useEffect(()=>{
        getAllPublishers();
    }, [])
    function getAllPublishers(){
        listPublishers().then((response)=> {
            setPublishers(response.data)
        }).catch(error => {
            console.error(error)
        })
    }
    function addPublisher(){
        navigator('/add-publisher')
    }
    function updatePublisher(id){
        navigator(`/update-publisher/${id}`)
    }

  return (
    <div className='container'>
        <h2 className='text-center' >Publisher List</h2> 
        <button type="button" className="btn btn-primary" onClick={addPublisher}>Add Publisher</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Publisher Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    publishers.map(
                        publisher =>
                        <tr key={publisher.publisherId}>
                            <td>{publisher.publisherId}</td>
                            <td>{publisher.publisherName}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updatePublisher(publisher.publisherId)}>Update</button>
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

export default ListPublisherComponent