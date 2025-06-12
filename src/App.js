import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
//import { validEmail, validName, validPassword } from './components/Regex.js'
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerAddUpdateList from './components/CustomerAddUpdateList';

function log(message){console.log(message);}
export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update Customer' : 'Add Customer';
  useEffect(() => { getCustomers() }, []);

  const getCustomers =  function(){
    log("in getCustomers()");
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    if(formObject.id === item.id){
      log("Already selected, deselecting item");
      setFormObject(blankCustomer);
    }
    else setFormObject(item);   
  }
/*Validation of Name, Email, Password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const validate = () => {
      if (!validName.test(name)) {
        setNameErr(true);
      }
      if (!validEmail.test(email)) {
         setEmailErr(true);
      }
      if (!validPassword.test(password)) {
         setPwdError(true);
      }
    }    
*/
  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    if(formObject.id >= 0){
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    if (mode === 'Add Customer') {
      post(formObject);
    }
    if (mode === 'Update Customer') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }

   let passProps = {
      handleInputChange: handleInputChange,
      onSaveClick: onSaveClick,
      onDeleteClick: onDeleteClick,
      onCancelClick: onCancelClick,
      mode: mode,
      formObject: formObject
    }
    let passListProps = {
      customers: customers,
      formObject: formObject,
      handleListClick: handleListClick 
    }
    
  return (
    <div className="App">
      <CustomerList {...passListProps} />
      <CustomerAddUpdateList {...passProps} />
    </div>
  );
}
export default App;