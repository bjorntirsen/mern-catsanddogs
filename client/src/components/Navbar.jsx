import React from "react";
import logo from '../logo.png';
import { NavLink } from "react-router-dom";
 
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
            <ul className="navbar li">
                <li className="navbar li a">
                    <NavLink to="/">
                        <img className="menu-logo" src={logo} />
                    </NavLink>
                </li>
                <li className="navbar li a">
                    <NavLink to="/">
                    Home
                    </NavLink>
                </li>
                <li className="navbar li a">
                    <NavLink to="/products">
                    Products
                    </NavLink>
                </li>
                <li className="navbar li a">
                    <NavLink to="/shoppingcart">
                    Shoppingcart
                    </NavLink>
                </li>
                <li className="navbar li a">
                    <NavLink to="/contact">
                    Contact
                    </NavLink>
                </li>
                <li className="navbar li a">
                    <NavLink to="/about">
                    About us
                    </NavLink>
                </li>
            </ul>
      </nav>
    </div>
  );
};
 
export default Navbar;