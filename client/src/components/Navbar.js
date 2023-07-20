import React from 'react'
import PropTypes from 'prop-types'

import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Navbar(props) {
  let navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("auth-token")
    navigate("/login")
  }
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/customers" ? "active" : ""}`} to={"/customers"}>View Customers</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/transactions" ? "active" : ""}`} to={"/transactions"} >Make a Transaction</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/transfers" ? "active" : ""}`} to={"/transfers"}>Transfer List</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to={"/about"}>{props.aboutText}</Link>
            </li>
            {!localStorage.getItem("auth-token") ? <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to={"/login"}>Login</Link>
            </li> : <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} onClick={handlelogout} >Logout</Link>
            </li>}


          </ul>

          {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = { title: PropTypes.string, aboutText: PropTypes.string }// just a precautionary check that title should be as string and not a number or an object


Navbar.defaultProps = {
  title: "Set Title here",
  aboutText: "About"
}// if values are not entered use these default prop