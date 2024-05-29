import React, {useEffect, useState} from 'react'
import {deleteAccount, listAccounts} from '../services/AccountService'
import {useNavigate} from 'react-router-dom'


const ListAccountComponent = () => {
  const [accounts, setAccounts] = useState([])  
  const navigator = useNavigate();
  useEffect(() => {
    getAllAcounts()
  }, [])
  function getAllAcounts(){
    listAccounts().then((response) => {
        setAccounts(response.data);
    }).catch(error => {
        console.error(error);
    })
  }
  function registerAccount(){
    navigator('/register')
  }
  function updateAccount(id){
    navigator(`/update-account/${id}`)
  }
  function disableAccount(id){
    console.log(id)

    deleteAccount(id).then(()=>{
        getAllAcounts()
    }).catch(error =>{
        console.error(error);
    })
  }

  return (
    <div className='container'>
        <h2 className='text-center' >List Accounts</h2> 
        <button type="button" class="btn btn-primary" onClick={registerAccount}>Register</button>
        
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                    <th>Active</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {

                    accounts.map(account =>
                        <tr key={account.accountID}>
                            <td>{account.accountID}</td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>0{account.phoneNum}</td>
                            <td>{account.role === 1 ? 'Patron' : 'Librian'}</td>
                            <td>{account.active === true ? 'Active' : 'Not Active'}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=> updateAccount(account.accountID)}>Update</button>
                                <button className='btn btn-danger' onClick={() => disableAccount(account.accountID)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListAccountComponent