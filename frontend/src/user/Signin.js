import React,{useState} from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { authenticate, isAutenticated, signin } from '../auth/helper';



function Signin() {

    const [values, setValues] = useState({
        email: "",
        password: "",
        success: false,
        error: "",
        loading: false,
        didRedirect: false
      });

      const {email, password, success, error, loading, didRedirect } = values;

    const handleUpdates = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({email, password})
        .then( data => {
            // console.log("D", data);
            if(data.token){
                let session_token = data.token;
                authenticate(data,()=>{console.log("Token Added")})
                setValues({
                    ...values,
                    didRedirect: true
                })
            }else{
                setValues({...values, loading: false})
            }
        } )
        .catch(err => console.log(err))

    }

    const doRedirect = () => {
        if(isAutenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        if(loading){
            return(
                <div className="alert alert-info">
                    Loading...
                </div>
            );
        }
    }

    // const successMessage = () => {
    //     return(
    //         <div className="row">
    //             <div className="col-md-6 offset-sm-3 text-left">
    //               <div className="alert alert-success" style={{ display : success ? "" : "none"}}>
    //                   Account created successfully.Press here to  <Link to="/signin" >LOGIN.</Link>
    //               </div>
    //             </div>
    //         </div>
    //     );
    // }

    // const failuresMessage = () => {
    //   return(
    //       <div className="row">
    //           <div className="col-md-6 offset-sm-3 text-left">
    //             <div className="alert alert-danger" style={{ display : (error) ? "" : "none"}}>
    //                 Please enter all fields.
    //             </div>
    //           </div>
    //       </div>
    //   );
    // }

    const signInForm = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>

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

              <br/>

              <button className="btn btn-success btn-block" onClick={handleSubmit} >SUBMIT</button>
            </form>
          </div>
        </div>
      );
    };

    return (
    <Base title="Signin" description="Signin for user" >
        {loadingMessage()}
        {signInForm()}
        <p className="text-center text-white">
          {JSON.stringify(values)}
      </p>
      {doRedirect()}
    </Base>
  )
}

export default Signin
