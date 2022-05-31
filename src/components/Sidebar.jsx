import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from '../img/logo.png';

function Sidebar(props) {

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          className="simple-text logo-normal">
          University Sys
        </a>
      </div>
      <div className="sidebar-wrapper" >
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                key={key}
              >
                <NavLink
                  to={prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
