import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, auth, logout } = useAuth();
  const gotoHome = ()=>{
    navigate('/');
  }
  return (
    <>
      <nav className={navHeight ? "show nav" : "nav"}>
        <div className="logo" onClick={()=> gotoHome()}>PROPERTY RENTALS</div>
        <ul>
          <li>
            <Link to={"/aboutus"}>ABOUT US</Link>
          </li>
          <li>
            <Link to={"/villas"}>VILLAS</Link>
          </li>
          <li>
            <Link to={"/contact"}>CONTACT</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to={"/login"}>LOGIN</Link>
              </li>
              <li>
                <Link to={"/signup"}>SIGNUP</Link>
              </li>
            </>
          ) : (
            <>
              {auth?.role === "seller" ? (
                <li>
                  <Link to={"/seller/inventory"}>INVENTORY</Link>
                </li>
              ) : null}
              <li>
                <Link
                  to={"/"}
                  onClick={(event) => {
                    event.preventDefault();
                    logout();
                    navigate("/");
                  }}
                >
                  LOGOUT
                </Link>
              </li>
            </>
          )}
        </ul>
        <RxHamburgerMenu
          className="hamburger"
          onClick={() => setNavHeight(!navHeight)}
        />
      </nav>
    </>
  );
};

export default Navbar;