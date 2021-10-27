import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    success: false,
    error: "",
  });

  const { name, email, password,phone, success, error } = values;

  const handleUpdates = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      setValues({...values,error:false});
      signup({name, email,password,phone})
      .then(data =>{
          console.log("D",data);
          if(data.email === email){
              setValues({name: "",
              email: "",
              password: "",
              success: true,
              phone:"",
              error: "",})
          }else{
            setValues({name: "",
            email: "",
            password: "",
            success: false,
            phone:"",
            error: data.email[0],})
          }
      })
      .catch(e=>console.log(e))
  }

  const successMessage = () => {
      return(
          <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success" style={{ display : success ? "" : "none"}}>
                    Account created successfully.Press here to  <Link to="/signin" >LOGIN.</Link>
                </div>
              </div>
          </div>
      );
  }

  const failuresMessage = () => {
    return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div className="alert alert-danger" style={{ display : (error) ? "" : "none"}}>
                  Please enter all fields.
              </div>
            </div>
        </div>
    );
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleUpdates("name")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={handleUpdates("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handleUpdates("password")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Phone No.</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={handleUpdates("phone")}
              />
            </div>
            <br/>
            
            <button className="btn btn-success btn-block" onClick={handleSubmit} >SUBMIT</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup" description="Signup for User">
        {successMessage()}
        {failuresMessage()}
      {signUpForm()}
      <p className="text-center text-white">
          {JSON.stringify(values)}
      </p>
    </Base>
  );
}

export default Signup;
