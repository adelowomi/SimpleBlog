import React, { Component } from "react";
import Spinner from "../utilities/Spinner";
import Connect from "../utilities/Connect";

class CommentForm extends Component {
  state = {
    Name: "",
    Email: "",
    Message: "",
    loading: false,
    success: false,
    error: false,
    postId: this.props.postId,
  };
  handleChanges = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [name]: value });
  };

  postComment = (e) => {
    var Data = {
      Email: this.state.Email,
      Name: this.state.Name,
      Message: this.state.Message,
      PostId: this.state.postId,
      UserId: 0,
    };
    Connect("comment/postcomment", "post", JSON.stringify(Data))
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ success: true, loading: false });
          //   setTimeout(() => {
          //     document.getElementsByClassName(".alert").alert("close");
          //   }, 5000);
        } else {
          this.setState({ error: true, loading: false });
        }
      });
    console.log(Data);
    this.setState({ loading: true });
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="container-contact100">
              <div className="wrap-contact100">
                <span className="contact100-form-symbol">
                  <img src="/img/symbol-01.png" alt="SYMBOL-MAIL" />
                </span>
                <form
                  className="contact100-form validate-form flex-sb flex-w"
                  onSubmit={this.postComment}
                >
                  {this.state.success ? null : (
                    <span className="contact100-form-title">
                      Post A Comment
                    </span>
                  )}

                  {this.state.success ? (
                    <div className="col-12 text-center">
                      <div class="alert alert-success fade show" role="alert">
                        Thanks! Your Comment has been recieved
                      </div>
                    </div>
                  ) : this.state.error ? (
                    <div className="col-12 text-center">
                      <div class="alert alert-danger fade show" role="alert">
                        Sorry! We can not post your comment at this time.
                      </div>
                    </div>
                  ) : null}
                  {this.state.success ? null : (
                    <>
                      <div
                        className="wrap-input100 rs1 validate-input"
                        data-validate="Name is required"
                      >
                        <input
                          className="input100"
                          type="text"
                          name="Name"
                          onChange={this.handleChanges}
                          placeholder="Name"
                        />
                        <span className="focus-input100" />
                      </div>
                      <div
                        className="wrap-input100 rs1 validate-input"
                        data-validate="Email is required: e@a.z"
                      >
                        <input
                          className="input100"
                          type="text"
                          name="Email"
                          onChange={this.handleChanges}
                          placeholder="Email Address"
                        />
                        <span className="focus-input100" />
                      </div>
                      <div
                        className="wrap-input100 validate-input"
                        data-validate="Message is required"
                      >
                        <textarea
                          className="input100"
                          name="Message"
                          onChange={this.handleChanges}
                          placeholder="Write Us A Message"
                          defaultValue={""}
                        />
                        <span className="focus-input100" />
                      </div>
                      <div className="container-contact100-form-btn">
                        {this.state.loading ? (
                          <button className="contact100-form-btn  disabled">
                            <Spinner size="small" color="yellow" />
                          </button>
                        ) : (
                          <button className="contact100-form-btn" type="submit">
                            Send
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentForm;
