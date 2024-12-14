import React from "react";
import { Link } from "react-router-dom";

/**
 * Component to display the navigation bar.
 * @returns {JSX.Element} - The Navbar component.
 */
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            {/* Brand link */}
            <Link className="navbar-brand" to="/">Game Explorer</Link>
            {/* Toggle button for mobile view */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Navbar links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search" onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Search</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/watchlist" onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Watchlist</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default Navbar;