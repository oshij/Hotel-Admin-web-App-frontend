import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  return (
      <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-transparent py-2 fixed-top scrolled">
        <div className="container-fluid ">
          <span
            className="navbar-brand font-weight-bolder"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Hotel Admin.
          </span>
          <a
            href="void(0)"
            className="navbar-toggler border-0"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <FaAlignRight className="nav-icon" />
            </span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  //   activeClassName="active_class"
                  exact="true"
                  to="/"
                >
                  Rooms
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  //   activeClassName="active_class"
                  exact="true"
                  to="/addRoom"
                >
                  Add Room
                </NavLink>
              </li>
        
              <li>
                <NavLink
                  className="nav-link"
                  //   activeClassName="active_class"
                  exact="true"
                  to="/bookings"
                >
                  Bookings
                </NavLink>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
      
  );
};
export default Navbar;
