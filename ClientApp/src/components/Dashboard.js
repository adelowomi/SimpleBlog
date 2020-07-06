import React, { Component } from "react";
import Connect from "../utilities/Connect";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";
import Spinner from "../utilities/Spinner";
import PopularPost from "./PopularPost";
import UserProfile from "./UserProfile";
import { Pie, Polar } from "react-chartjs-2";

const sata = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
      label: "My dataset", // for legend
    },
  ],
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
};

class Dashboard extends Component {
  state = {
    token: "",
    Stats: {
      postCount: 0,
      likeCount: 0,
      commentCount: 0,
    },
    Posts: [],
    error: false,
    loading: false,
    errorMessage: "",
    viewing: "dashboard",
    pieData: {},
  };

  componentDidMount() {
    // const {token} = this.props.location.state.token;
    // this.setState({token:token})
    this.loadStats();
    this.listPost();
  }
  // total posts / Total likes * 100
  changeView(view) {
    this.setState({ viewing: view });
  }
  listPost = () => {
    Connect("post/listbyuser", "get")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ Posts: res.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadStats = () => {
    var data = {
      labels: ["Likes", "Posts"],
      datasets: [
        {
          data: [],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
    Connect("dashboard/data", "get")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res.data.likePercent);
          data.datasets[0].data = res.data.likePercent;
          this.setState({ loading: false, Stats: res.data });
          this.setState({ pieData: data });
        } else {
          this.setState({
            error: true,
            errorMessage:
              "There was a problem loading your stats at this time please try again later",
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage:
            "There was a problem loading your stats at this time please try again later",
          loading: false,
        });
      });
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <button
            className="navbar-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="row">
              <div className="col-lg-2 sidebar  px-0 fixed-top">
                <div className="titles h1-responsive py-3 pl-3">
                  <div className="font-weight-bold mx-2 h2 text-white">
                    Test Project
                  </div>
                </div>
                <div className="sidebar-menu">
                  <ul>
                    <li
                      className="current"
                      style={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.555)",
                      }}
                      onClick={() => this.changeView("dashboard")}
                    >
                      <div
                        className="h6 text-white font-weight-normal"
                        onClick={() => this.changeView("dashboard")}
                      >
                        <i className="fas fa-tachometer-alt pr-3" />
                        Dashboard
                      </div>
                    </li>
                    <li onClick={() => this.changeView("blog-posts")}>
                      <div
                        className="h6 text-white font-weight-normal"
                        onClick={() => this.changeView("blog-posts")}
                      >
                        <i className="fas fa-blog pr-3" />
                        Blog Posts
                      </div>
                    </li>
                    <li onClick={() => this.changeView("add-new")}>
                      <div
                        className="h6 text-white font-weight-normal"
                        onClick={() => this.changeView("add-new")}
                      >
                        <i className="fas fa-folder-plus pr-3" />
                        Add New Post
                      </div>
                    </li>
                    <li onClick={() => this.changeView("user-profile")}>
                      <div
                        className="h6 text-white font-weight-normal"
                        onClick={() => this.changeView("user-profile")}
                      >
                        <i className="fas fa-id-badge pr-3" />
                        User Profile
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2" style={{ marginLeft: "1100px" }}>
                <ul className="navbar-nav nav-flex-icons ">
                  <li className="nav-item ml-auto">
                    <a className="nav-link waves-effect waves-light" href>
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link waves-effect waves-light" href>
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
                      <a className="dropdown-item" href="log-in.html">
                        Login
                      </a>
                      <a className="dropdown-item" href="sign-up.html">
                        Sign Up
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {this.state.viewing == "dashboard" ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2" />
              <div className="col-lg-10 px-0">
                <div className="admin-container">
                  <div className="title-menu mt-5 pt-5">
                    <h1 style={{ fontWeight: 700, fontSize: "30px" }}>
                      Blog Overview
                    </h1>
                  </div>
                  <div className="mt-5">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="small-cards blue lighten-5">
                          <h2>Posts</h2>
                          <h1>
                            {!this.state.Stats.postCount == 0 ? (
                              this.state.Stats.postCount
                            ) : (
                              <Spinner sixe="small" color="yellow" />
                            )}
                          </h1>
                          {/* <p>View All Posts</p> */}
                        </div>
                      </div>

                      <div className="col-lg-3">
                        <div className="small-cards indigo lighten-5">
                          <h2>Likes</h2>
                          <h1>
                            {!this.state.Stats.likeCount == 0 ? (
                              this.state.Stats.likeCount
                            ) : (
                              <Spinner sixe="small" color="yellow" />
                            )}
                          </h1>
                          {/* <p>View All Likes</p> */}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="small-cards deep-purple lighten-5">
                          <h2>Comments</h2>
                          <h1>
                            {!this.state.Stats.commentCount == 0 ? (
                              this.state.Stats.commentCount
                            ) : (
                              <Spinner sixe="small" color="yellow" />
                            )}
                          </h1>
                          {/* {<p>View All Comments</p>} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 mb-5">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="large-cards">
                          <div
                            className="head-card py-3"
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                              textAlign: "left",
                              color: "rgb(66, 65, 65)",
                              marginLeft: "20px",
                            }}
                          >
                            User Insights
                          </div>
                          <div className="bottom-border mb-5" />
                          <Polar data={sata} />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="large-cards">
                          <div
                            className="head-card py-3"
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                              textAlign: "left",
                              color: "rgb(66, 65, 65)",
                              marginLeft: "20px",
                            }}
                          >
                            Overall Likes Statistics
                          </div>
                          <div className="bottom-border mb-3" />
                          <Pie data={this.state.pieData} />
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
        ) : this.state.viewing == "blog-posts" ? (
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2" />
              <div className="col-lg-10 px-0">
                <div className="admin-container">
                  <div className="title-menu mt-5 pt-5"></div>
                  <div className="mt-5 mb-5">
                    <div className="row">
                      {this.state.Posts.map((post, index) => (
                        <PopularPost post={post} key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : this.state.viewing == "add-new" ? (
          <AddPost />
        ) : this.state.viewing == "user-profile" ? (
          <UserProfile />
        ) : null}
      </>
    );
  }
}

export default Dashboard;
