import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listCategories } from '../services/CategoryService';

const ListCategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const navigator = useNavigate();
    useEffect(() => {
        getAllCategories();
    }, [])

    function getAllCategories(){
        listCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addCategory(){
        navigator('/add-category');
    }
    function updateCategory(categoryId){
        navigator(`/update-category/${categoryId}`);
    }
  return (
    <div className='container'>
        <h2 className='text-center' >Category List</h2> 
        <button type="button" className="btn btn-primary" onClick={addCategory}>Add Category</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map(
                        category =>
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateCategory(category.categoryId)}>Update</button>
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

export default ListCategoryComponent