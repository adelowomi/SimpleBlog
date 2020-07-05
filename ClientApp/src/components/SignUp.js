import React, { Component } from 'react';
import Connect from '../utilities/Connect';
import Spinner from '../utilities/Spinner';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom'

class SignUp extends Component {
    state = {
        Name : '', 
        Email:'',
        UserName:'',
        Password:'',
        ConfirmPassword:'',
        passwordValid:true,
        passwordMatch:true,registered:false,
        loading:false,error:false,errorMessage:''
    }

    passwordMatch = (e) =>{
        let SecondPassword = e.target.value;
        if(this.state.Password == SecondPassword){
            this.setState({passwordMatch:true,ConfirmPassword: SecondPassword})
        }else{
            this.setState({passwordMatch:false})
        }
    }

    onPasswordChange = event => {
        var _data = this.state.Password;
        _data = event.target.value;
        this.setState({ Password: _data });
        if (_data && _data.length > 0) {
          if (!_data.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/)) {
            this.setState({ passwordValid: false });
          } else {
            this.setState({ passwordValid: true });
          }
        } else {
          this.setState({ passwordValid: true });
        }
    
      };

    onRegister = (e) => {
        this.setState({loading:true});
        var Data = {
            Name: this.state.Name,
            Email:this.state.Email,
            Password:this.state.Password,
            UserName: this.state.Email
        };
        Connect('user/register','post',JSON.stringify(Data))
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.success){
                this.setState({loading:false,registered:true})
                setTimeout(() => {
                    this.setState({redirect:true})
                }, 100000)
            }else{
                this.setState({error:true,loading:false,errorMessage:data.errorMessage})
            }
        })
        .catch(error => {
            this.setState({loading:false,error:true,errorMessage:"An error Occoured please try again later"})
        })

        e.preventDefault();
    }

    handleChanges = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.type === "checkbox" ? input.checked : input.value;
        this.setState({ [name]: value });
      };
    render() {
        if (this.state.registered) {
            return <Redirect to="login" />
          }
        return (
            <>
            <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
                <div className="container">
                <a className="navbar-brand active font-weight-bold" href="#">Test Project</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                </div></nav>
            <div className="limiter">
                <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form className="login100-form validate-form flex-sb flex-w" onSubmit={this.onRegister}>
                    <span className="login100-form-title p-b-51">
                        Sign Up
                    </span>
                    {this.state.error ? 
                    <div className="col-12 text-center">
                    <div class="alert alert-danger fade show" role="alert">
                      {this.state.errorMessage}
                    </div>
                  </div>
                    : null
                    }
                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100" />
                        <input className="input100" type="text" name="Name" placeholder="Name..." onChange={this.handleChanges}/>
                        <span className="focus-input100" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                        <span className="label-input100" />
                        <input className="input100" type="text" name="Email" placeholder="Email addess..." onChange={this.handleChanges}/>
                        <span className="focus-input100" />
                    </div>
                    {!this.state.passwordValid ? 
                    <div className="col-12 text-center">
                    <div class="alert alert-danger fade show" role="alert">
                      Your password must contain at least one Upper case, Lower case and one Alphanumeric character
                    </div>
                  </div>
                    : null
                    }
                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                        <span className="label-input100" />
                        <input className="input100" type="text" name="pass" placeholder="Password" onChange={this.onPasswordChange}/>
                        <span className="focus-input100" />
                    </div>
                    {
                        !this.state.passwordMatch ? 
                        <div className="col-12 text-center">
                    <div class="alert alert-danger fade show" role="alert">
                      Your password does not match
                    </div>
                  </div> : null
                    }
                    <div className="wrap-input100 validate-input" data-validate="Repeat Password is required">
                        <span className="label-input100" />
                        <input className="input100" type="text" name="repeat-pass" placeholder="Repeat Password" onChange={this.passwordMatch}/>
                        <span className="focus-input100" />
                    </div>
                    <div className="flex-sb-m w-full p-t-3 p-b-24">
                        <div className="contact100-form-checkbox">
                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="checked" onChange={this.handleChanges}/>
                        <label className="label-checkbox100" htmlFor="ckb1">
                            <span className="txt1">
                            I agree to the
                            <a href="#" className="txt2 hov1">
                                Terms of User
                            </a>
                            </span>
                        </label>
                        </div>
                        <div>
                        <a href="#" className="txt1">
                            Forgot?
                        </a>
                        </div>
                    </div>
                    <div className="container-login100-form-btn m-t-17">
                    {this.state.loading ?
                        <button className="login100-form-btn disabled">
                        <Spinner size="small" color="yellow"/>
                        </button>
                    : !this.state.passwordMatch ?
                        <button className="login100-form-btn disabled">
                        Sign Up
                        </button> :
                         <button className="login100-form-btn ">
                         Sign Up
                         </button>
                    }
                    </div>
                    <div className="signup">
                        <p>Already Have an Account? <Link to="login"> Log In</Link></p>
                    </div>
                    </form>
                </div>
                <div className style={{position: 'absolute', marginTop: 410}}>
                    <Link to="/"><p style={{color: 'white'}}>Back to Test Project Homepage</p></Link>
                </div>
                </div>
            </div>
            </div>

            </>
        );
    }
}

export default SignUp;