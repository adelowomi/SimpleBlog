import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Connect from '../utilities/Connect';


class SignIn extends Component {
    state = {
        Email:'',
        Password:'',
        loading: false
    }

    handleChanges = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.type === "checkbox" ? input.checked : input.value;
        this.setState({ [name]: value });
      };

      onLogIn = (e) => {
          this.setState({loading:true})
          var Data = {
              Email : this.state.Email,
              Password: this.state.Password
          }
          Connect('token', 'post', JSON.stringify(Data))
          .then();
      }
    render() {
        return (
           <>
            <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
                <div className="container">
                <a className="navbar-brand active font-weight-bold" href="/">Test Project</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                </div></nav>
            <div className="limiter">
                <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form className="login100-form validate-form flex-sb flex-w">
                    <span className="login100-form-title p-b-51">
                        <p>Welcome Back!</p>
                        Login
                    </span>
                    <div className="wrap-input100 validate-input m-b-16" data-validate="Username is required">
                        <input className="input100" type="text" name="username" placeholder="Username" />
                        <span className="focus-input100" />
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                        <input className="input100" type="password" name="pass" placeholder="Password" />
                        <span className="focus-input100" />
                    </div>
                    <div className="flex-sb-m w-full p-t-3 p-b-24">
                        <div className="contact100-form-checkbox">
                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                        <label className="label-checkbox100" htmlFor="ckb1">
                            Remember me
                        </label>
                        </div>
                        <div>
                        <a href="#" className="txt1">
                            Forgot?
                        </a>
                        </div>
                    </div>
                    <div className="container-login100-form-btn m-t-17">
                        <button className="login100-form-btn">
                        Login
                        </button>
                    </div>
                    <div className="signup">
                        <p>Not a Member? <a href="sign-up.html"> Sign Up</a></p>
                    </div>
                    </form>
                </div>
                <div className style={{position: 'absolute', marginTop: 270}}>
                    <a href="index.html"><p style={{color: 'white'}}>Back to Test Project Homepage</p></a>
                </div>
                </div>
            </div>
            </div>
           </>
        );
    }
}

export default SignIn;