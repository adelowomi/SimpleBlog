import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Connect from "../utilities/Connect";
import Spinner from "../utilities/Spinner";

class SignIn extends Component {
  state = {
    Email: "",
    Password: "",
    loading: false,
    redirect: false,
  };

  handleChanges = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [name]: value });
  };

  onLogIn = (e) => {
    this.setState({ loading: true });
    var Data = {
      Email: this.state.Email,
      Password: this.state.Password,
    };
    Connect("token/login", "post", JSON.stringify(Data))
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem("token", res.data.token);
          this.setState({ loading: false, redirect: true });
        } else {
          this.setState({
            error: true,
            errorMessage: res.errorMessage,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
          errorMessage: "An error occured please try again after sometime",
        });
      });
    e.preventDefault();
  };
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { token: this.state.token },
          }}
        />
      );
    }
    return (
      <>
        <div>
          <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
            <div className="container">
              <a className="navbar-brand active font-weight-bold" href="/">
                Test Project
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </nav>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-t-50 p-b-90">
                <form
                  className="login100-form validate-form flex-sb flex-w"
                  onSubmit={this.onLogIn}
                >
                  <span className="login100-form-title p-b-51">
                    <p>Welcome Back!</p>
                    Login
                  </span>
                  {this.state.error ? (
                    <div className="col-12 text-center">
                      <div class="alert alert-danger fade show" role="alert">
                        {this.state.errorMessage}
                      </div>
                    </div>
                  ) : null}
                  <div
                    className="wrap-input100 validate-input m-b-16"
                    data-validate="Username is required"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="Email"
                      placeholder="Email"
                      onChange={this.handleChanges}
                    />
                    <span className="focus-input100" />
                  </div>
                  <div
                    className="wrap-input100 validate-input m-b-16"
                    data-validate="Password is required"
                  >
                    <input
                      className="input100"
                      type="password"
                      name="Password"
                      placeholder="Password"
                      onChange={this.handleChanges}
                    />
                    <span className="focus-input100" />
                  </div>
                  
                  <div className="container-login100-form-btn m-t-17">
                    {this.state.loading ? (
                      <button className="login100-form-btn disabled">
                        <Spinner size="small" color="yellow" />
                      </button>
                    ) : (
                      <button className="login100-form-btn ">Login</button>
                    )}
                  </div>
                  <div className="signup">
                    <p>
                      Not a Member? <Link to="/register"> Sign Up</Link>
                    </p>
                  </div>
                </form>
              </div>
              <div className style={{ position: "absolute", marginTop: 270 }}>
                <Link to="/">
                  <p style={{ color: "white" }}>
                    Back to Test Project Homepage
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignIn;
