import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const Navbar = (): React.JSX.Element => {
  const [isActive, setActive] = useState(false);
  const toggleActive = () : void => {
    setActive(!isActive);
  };

  return (
    <>
      <header className="section">
        <nav className="navbar is-link is-fixed-top" role="navigation">
          <div className="navbar-brand">
            <Link to={"/"} className="navbar-item">Home</Link>

            <a className={`navbar-burger ${isActive ? "is-active" : ""}`} role="button" onClick={toggleActive}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${isActive ? "is-active" : ""}`}> 
            <Link to={"/sorceries"} className="navbar-item">Sorceries</Link>
            <Link to={"/incantations"} className="navbar-item">Incantations</Link>
            <div className="navbar-end">
              <Link to={"/account"} className="navbar-item">Account</Link>
            </div>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  )
}
