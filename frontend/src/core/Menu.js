import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAutenticated, signout } from '../auth/helper';


const currentTab = (history,path) => {
    //198754
    if(history.location.pathname === path) {
        return {color: "#198754"}
    }else{
        return {color: "white"}
    }
}

const forSign = (history,path) => {
    const check = isAutenticated()
    if(history.location.pathname === path) {
        return {color: "#198754" , display : check ? "none" : ""}
    }else{
        return {color: "white",display : check ? "none" : ""}
    }
}
const forSignout = (history,path) => {
    const check = isAutenticated()
    if(history.location.pathname === path) {
        return {color: "#198754" , display : !check ? "none" : "" , cursor : "pointer"}
    }else{
        return {color: "white",display : !check ? "none" : "", cursor : "pointer"}
    }
}

function Menu({ history, path }) {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" style={currentTab(history,"/")} to="/">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link" style={forSignout(history,"/user/dashboard")} to="/user/dashboard">User page</Link>
        <Link className="nav-link" style={currentTab(history,"/cart")} to="/cart">Cart</Link>
        <Link className="nav-link" style={forSign(history,"/signin")} to="/signin" >Signin</Link>
        <Link className="nav-link" style={forSign(history,"/signup")} to="/signup">Signup</Link>
        <span className="nav-link text-warning"  style={forSignout(history,"/signup")} onClick={()=>{ signout(()=>{history.push("/")}) }} >Signout</span>
      </div>
    </div>
  </div>
</nav>
  )
}

export default withRouter(Menu);
