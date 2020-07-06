import React, { Component } from "react";
import Connect from "../utilities/Connect";
import { Link } from "react-router-dom";
import Spinner from "../utilities/Spinner";

class AddPost extends Component {
  state = {
    posted: false,
    categories: [],
    loading: false,
    Title: "",
    Quote: "",
    Content: "",
    CategoryId: 0,
  };

  componentDidMount() {
    console.log("mounted");
    this.fetchCategories();
  }
  //to retrieve categories if they are persisted to the backend
  fetchCategories = () => {
    Connect("category/list", "get")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((error) => {});
  };

  setCategory = (id) => {
    this.setState({ CategoryId: id });
  };

  publish = (e) => {
    this.setState({ loading: true });
    var Data = {
      Title: this.state.Title,
      Quote: this.state.Quote,
      Content: this.state.Content,
      CategoryId: this.state.CategoryId,
    };
    Connect("post/newpost", "post", JSON.stringify(Data))
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ posted: true, loading: false, newPostId: res.data });
        }
      });
    e.preventDefault();
  };

  handleChanges = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-10 px-0">
            {this.state.posted ? (
              <div
                className="alert alert-success"
                style={{ marginTop: 60, borderRadius: 0 }}
                role="alert"
              >
                Success! Your Post is Online now{" "}
                <Link
                  to={`/post/${this.state.newPostId}`}
                  className="alert-link"
                >
                  Click Here
                </Link>{" "}
                To view Post.
              </div>
            ) : null}

            <div className="admin-container">
              <div className="title-menu mt-0 pt-2">
                <h1 style={{ fontWeight: 700, fontSize: 30 }}>
                  Add a New Post
                </h1>
              </div>
              <div className="mt-5 mb-5">
                <div className="row">
                  <div className="col-lg-9 col-md-8">
                    <div className="large-cards">
                      <div className="admin-container">
                        <div className="title-area">
                          <div className="form-group pt-4">
                            <textarea
                              className="form-control "
                              id="exampleFormControlTextarea3"
                              name="Title"
                              placeholder="Your Post Title Here"
                              defaultValue={""}
                              onChange={(e) => this.handleChanges(e)}
                            />
                          </div>
                        </div>
                        <div className="title-area">
                          <div className="form-group pt-4">
                            <textarea
                              className="form-control "
                              id="exampleFormControlTextarea3"
                              name="Quote"
                              placeholder="Type in a catchy phrase from th main post content"
                              defaultValue={""}
                              onChange={(e) => this.handleChanges(e)}
                            />
                          </div>
                        </div>
                        <div className="content-post">
                          <div className="form-group pt-1">
                            <textarea
                              className="form-control"
                              rows="10"
                              id="exampleFormControlTextarea3"
                              name="Content"
                              placeholder="Words of text and stories should go in here!"
                              defaultValue={""}
                              onChange={(e) => this.handleChanges(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-6">
                          <form className="md-form mt-2">
                            <div className="file-field">
                              <a className="btn-floating purple-gradient mt-0 float-left">
                                <i
                                  className="fas fa-cloud-upload-alt"
                                  aria-hidden="true"
                                />
                                <input type="file" />
                              </a>
                              <div className="file-path-wrapper">
                                <input
                                  className="file-path validate"
                                  type="text"
                                  placeholder="Upload your file"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div
                          className="col-lg-3"
                          style={{ marginLeft: "-50px" }}
                        >
                          <button
                            className="btn btn-mygreen text-white mt-2"
                            style={{ padding: "10px 12px", borderRadius: 10 }}
                          >
                            <i className="fas fa-cloud-upload-alt" /> Upload
                            File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="large-cards">
                      <div
                        className="head-card py-4"
                        style={{
                          fontSize: 17,
                          fontWeight: 600,
                          textAlign: "left",
                          color: "rgb(66, 65, 65)",
                          marginLeft: 20,
                        }}
                      >
                        Categories
                      </div>
                      <div className="bottom-border mb-4" />
                      {/* Material indeterminate */}
                      <div
                        className="category-link"
                        style={{ marginLeft: 0, textAlign: "start" }}
                      >
                        {this.state.categories.map((category, index) => (
                          <div className="form-check pb-2" key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="materialIndeterminate2"
                              unchecked
                              value={category.id}
                              onChange={() => this.setCategory(category.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="materialIndeterminate2"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="spaces" />
                      {this.state.loading ? (
                        <div
                          className="btn btn-mygreen text-white"
                          style={{ padding: "10px 12px", borderRadius: 10 }}
                        >
                          <Spinner sixe="small" color="yellow" />
                        </div>
                      ) : (
                        <div
                          onClick={(e) => this.publish(e)}
                          className="btn btn-mygreen text-white"
                          style={{ padding: "10px 12px", borderRadius: 10 }}
                        >
                          <i
                            className="fa fa-newspaper"
                            onClick={(e) => this.publish(e)}
                          />
                        </div>
                      )}
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

export default AddPost;
