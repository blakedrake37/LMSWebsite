import React, { useEffect, useState } from "react";
import { createAccount, getAccount, updateAccount } from "../services/AccountService";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../services/BookService";

const CreateAccountComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const {id} = useParams();
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    phoneNum: ''
  })
    const navigator = useNavigate();
    useEffect(() => {
        if(id){
            getAccount(id).then((response) => {
                setUsername(response.data.username)
                setEmail(response.data.email)
                setPhoneNum(response.data.phoneNum)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id])
  const saveAccount = (event) => {
    event.preventDefault();
    if(validateForm()){
        let account = {
            username: username,
            password: password,
            email: email,
            phoneNum: phoneNum,
            role: 1
          };
          console.log(account);
          if(id){
            updateAccount(id, account).then(response => {
                console.log(response.data)
                navigator('/accounts')
            }).catch(error => {
                console.log(error)
            
            })
          }else{
            createAccount(account).then((response) =>{
                console.log(response.data);
                navigator('/accounts');
            }).catch(error => {
                  console.log(error)
            })
          }

    }
  };
  function validateForm(){
    let valid = true;
    const errorsCopy = {... errors}

    if(username.trim()){
        errorsCopy.username = '';
    }else{
        errorsCopy.username = 'Username is required';
        valid = false;
    }
    if(password.trim()){
        errorsCopy.password = '';
    }else{
        errorsCopy.password = 'Password is required';
        valid = false;
    }
    if(email.trim()){
        errorsCopy.email = '';
    }else{
        errorsCopy.email = 'Email is required';
        valid = false;
    }
    if(phoneNum.trim()){
        errorsCopy.phoneNum = '';
    }else{
        errorsCopy.phoneNum = 'Phone Number is required';
        valid = false;
    }
    setErrors(errorsCopy)
    return valid
  }
  function pageTitle(){
    return id ? 'Update Account' : 'Add Account'
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
                <label className="form-label">Username:</label>
                <input
                  placeholder="Username"
                  name="username"
                  className={`form-control ${ errors.username ? 'is-invalid' : ''}`}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Password:</label>
                <input
                type="password"
                  placeholder="Password"
                  name="password"
                  className={`form-control ${ errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                type="email"
                  placeholder="Email"
                  name="email"
                  className={`form-control ${ errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Phone Number:</label>
                <input
                type="text"
                  placeholder="Phone Number"
                  name="phoneNum"
                  className={`form-control ${ errors.phoneNum ? 'is-invalid' : ''}`}
                  value={phoneNum}
                  onChange={(event) => setPhoneNum(event.target.value)}
                />
                {errors.phoneNum && <div className="invalid-feedback">{errors.phoneNum}</div>}
              </div>
              <button className="btn btn-success" onClick={saveAccount}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
