import React, { Component } from "react";

class UserProfile extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-10 px-0">
            <div className="admin-container">
              <div className="title-menu mt-5 pt-5">
                <p
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  User Overview
                </p>
                <h1 style={{ fontWeight: 700, fontSize: 30 }}>User Profile</h1>
              </div>
              <div className="mt-5 mb-5">
                <div className="row">
                  <div className="col-lg-4 col-md-8">
                    <div className="large-cards">
                      <div className="col-sm-10 mb-md-0 mb-3 mx-auto">
                        <img
                          src="https://via.placeholder.com/489/a8a8a8/808080?text=."
                          className="mt-5 avatar rounded-circle z-depth-1-half img-fluid"
                        />
                      </div>
                      <h1
                        style={{ fontSize: 35, fontWeight: 700, marginTop: 15 }}
                      >
                        Billy John
                      </h1>
                      <p
                        style={{
                          marginTop: 5,
                          fontWeight: 600,
                          letterSpacing: 2,
                        }}
                      >
                        Editor
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8">
                    <div className="large-cards">
                      <div
                        className="head-card py-3"
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          textAlign: "left",
                          color: "rgb(66, 65, 65)",
                          marginLeft: 20,
                        }}
                      >
                        Edit Profile
                      </div>
                      <div className="bottom-border mb-3" />
                      <div className="admin-container">
                        <form className="needs-validation" noValidate>
                          <div className="form-row text-left">
                            <div className="col-md-12 mb-3">
                              <label htmlFor="validationCustom01">
                                First name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                placeholder="First name"
                                defaultValue="Mark"
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <label htmlFor="validationCustom02">
                                Last name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom02"
                                placeholder="Last name"
                                defaultValue="Otto"
                                required
                              />
                              <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <label htmlFor="validationCustomUsername">
                                Username
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span
                                    className="input-group-text"
                                    id="inputGroupPrepend"
                                  >
                                    @
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="validationCustomUsername"
                                  placeholder="Username"
                                  aria-describedby="inputGroupPrepend"
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please choose a username.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row text-left">
                            <div className="col-md-12 mb-12">
                              <label htmlFor="validationCustom03">
                                Password
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom03"
                                placeholder="Password"
                                required
                              />
                              <div className="invalid-feedback">
                                Please provide a valid Password.
                              </div>
                              <div className="form-group mt-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue
                                    id="invalidCheck"
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="invalidCheck"
                                  >
                                    Agree to terms and conditions
                                  </label>
                                  <div className="invalid-feedback">
                                    You must agree before submitting.
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end">
                                <button
                                  className="btn btn-mygreen text-white btn-sm"
                                  type="submit"
                                >
                                  Submit form
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-copyright pt-3 text-center text-white">
              <div className="layers ">
                <div className="container-fluid ">
                  © 2020 Copyright:{" "}
                  <a href="# " style={{ fontWeight: 400, color: "white" }}>
                    TestProject.com{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
