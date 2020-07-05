import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  componentDidMount() {
    this.sticky();
  }

  sticky = () => {
    window.onscroll = function () {
      myFunction();
    };

    var navbar = document.getElementById("navibar");
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  };
  render() {
    return (
      <div id="navibar">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand active" href="index.html">
              <strong>Home</strong>
            </a>
            <button
              className="navbar-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    About <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Categories
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto nav-flex-icons">
                <li className="nav-item">
                  <a className="nav-link waves-effect waves-light" href="/">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link waves-effect waves-light" href="/">
                    <i className="fab fa-google-plus-g" />
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink-333"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right dropdown-default"
                    aria-labelledby="navbarDropdownMenuLink-333"
                  >
                    <Link className="dropdown-item" to="login">
                      Login
                    </Link>
                    <Link className="dropdown-item" to="register">
                      Sign Up
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
