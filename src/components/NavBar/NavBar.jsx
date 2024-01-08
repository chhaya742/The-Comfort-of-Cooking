import { Link } from "react-router-dom";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navBar.css'
import { toast } from "react-toastify";
import { AiOutlineBars } from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import mono from '../../assests/mono.png';
import { NavDropdown } from 'react-bootstrap'
import { IconContext } from "react-icons/lib";

const NavBar = (props) => {
  const navigate = useNavigate();

  var handleRedirect = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    toast.success("logout Successfully")
    navigate("/login")
  }
  const user = localStorage.getItem("user")
  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
          <div>  <img src={mono} className="mono" alt="iNoteBook" /></div>
          <div> {props.search}</div>
          <Link style={{ marginLeft: "1rem" }} className="navbar-brand" to="/">Recipe <span className="sr-only">(current)</span></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" style={{ fontSize: "20px" }}>
              <li className="nav-item"><Link className="nav-link" to="/Home">Home</Link></li>
              <div className="notification-area"> <li className="nav-item"><Link className="nav-link" to="/"><FiBell /></Link></li></div>
              <div className="user-profile-dropdown" >
                <NavDropdown title=<AiOutlineBars /> id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1"> Signed in as <Link style={{ color: "black" }} to="/user-profile" >{JSON.parse(user).userDetials[0].Name}</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item ><Link to="/login" style={{ color: "black" }} >  <IoPersonAdd style={{ color: "black" }} /> Add another account</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#Setting">Setting</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Help</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleRedirect} >logout</NavDropdown.Item>
                </NavDropdown></div>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </div>
  );
}
export default NavBar;