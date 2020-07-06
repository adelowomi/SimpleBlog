import React, { Component } from "react";
import Connect from "../utilities/Connect";
import Spinner from "../utilities/Spinner";
import Footer from "./Footer";
import Headers from "./Headers";
import Navbar from "./Navbar";
import { Link } from "react-router";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

class Post extends Component {
  state = {
    postId: 0,
    loading: false,
    Post: {},
    Comments: [],
    Author: {},
    liked: false,
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log(params.postId);
    this.setState({
      loading: true,
      postId: params.postId,
    });
    this.loadPost();
  }
  onLikeClick = () => {
    console.log(this.state.postId);
    var postid = this.state.postId;
    this.setState({ liked: !this.state.liked });
    if(this.state.liked){
      Connect(`post/like/${postid}`, "get")
      .then((res) => res.json())
      .then((res) => console.log(res));
    }

  };

  loadPost = () => {
    const {
      match: { params },
    } = this.props;
    Connect(`post/getpost/${params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.data.comments.length);
          this.setState({
            Post: data.data,
            Comments: data.data.comments,
            Author: data.data.author,
            loading: false,
          });
        }
      });
  };
  render() {
    return (
      <>
        <Headers />
        <Navbar />
        {this.state.loading ? (
          <div className="mx-auto text-center mt-5">
            <Spinner size="big" color="blue" />
          </div>
        ) : (
          <div className="container">
            <section className="section mt-5 pb-3 wow fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="card card-cascade wider reverse"
                    style={{ zIndex: -1 }}
                  >
                    <div
                      className="view view-cascade overlay"
                      style={{ zIndex: 1 }}
                    >
                      <img
                        className="card-img-top"
                        src="https://via.placeholder.com/1600x707/a8a8a8/808080?text=."
                        alt="Card-imagecap"
                      />
                      <a href="#!">
                        <div className="mask rgba-white-slight" />
                      </a>
                    </div>
                    {/*Post data*/}
                    <div className="card-body card-body-cascade text-center">
                      <h2>
                        <a href="/">
                          <strong>{this.state.Post.title}</strong>
                        </a>
                      </h2>
                      <p>
                        Written by{" "}
                        <a href="/">
                          {this.state.Author.firstName +
                            " " +
                            this.state.Author.lastName}
                        </a>
                        , 26/08/2016
                      </p>
                      {/*Social shares*/}
                      <div className="social-counters text-white">
                        {/*Facebook*/}
                        <a className="btn btn-mygreen text-white" href="/">
                          <i className="fab fa-facebook-f left " />
                          <span className="clearfix d-none d-md-block">
                            Facebook
                          </span>
                        </a>
                        <span className="counter ">46</span>
                        {/*Twitter*/}
                        <a className="btn btn-mygreen text-white" href="/">
                          <i className="fab fa-twitter left " />
                          <span className="clearfix d-none d-md-block">
                            Twitter
                          </span>
                        </a>
                        <span className="counter ">22</span>
                        {/*Dribbble*/}
                        <a className="btn btn-mygreen text-white" href="/">
                          <i className="fab fa-instagram left " />
                          <span className="clearfix d-none d-md-block">
                            Instagram
                          </span>
                        </a>
                        <span className="counter ">31</span>
                        {/*Comments*/}
                        <a className="btn btn-mygreen text-white" href="/">
                          <i className="fas fa-comments left " />
                          <span className="clearfix d-none d-md-block ">
                            Comments
                          </span>
                        </a>
                        <span className="counter ">
                          {this.state.Comments.length}
                        </span>
                      </div>
                      {/*Social shares*/}
                    </div>
                    {/*Post data*/}
                  </div>
                  <div
                    className="excerpt mt-5 wow fadeIn text-justify"
                    data-wow-delay="0.3s"
                  >
                    <p>{this.state.Post.content}</p>
                    <blockquote
                      className="blockquote mt-4 mb-4"
                      style={{ borderLeft: "2px solid #1e90ff" }}
                    >
                      <p className="mb-0">
                        <em>{this.state.Post.quote}</em>
                      </p>
                      <footer className="blockquote-footer">
                        <cite title="Source Title">
                          {this.state.Author.firstName +
                            " " +
                            this.state.Author.lastName}
                        </cite>
                      </footer>
                    </blockquote>
                    <div className="categorys">
                      <div className="mt-4 h5 grey-text">
                        {this.state.liked ? (
                          <span
                            className="h1 red-text"
                            onClick={this.onLikeClick}
                          >
                            <i class="fas fa-heart"></i>
                          </span>
                        ) : (
                          <span
                            className="h1 grey-text"
                            onClick={this.onLikeClick}
                          >
                            <i class="fas fa-heart"></i>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr class="mb-5 mt-4"></hr>
            <section>
              <div
                className="jumbotron p-5 text-center text-md-left author-box wow fadeIn"
                data-wow-delay="0.3s"
              >
                {/*Name*/}
                <h4 className="h3-responsive text-center font-weight-bold dark-grey-text">
                  About author
                </h4>
                <hr />
                <div className="row">
                  {/*Avatar*/}
                  <div className="col-12 col-md-2 mb-md-0 mb-4">
                    <img
                      src="/img/avatar.png"
                      className="img-fluid rounded-circle z-depth-2"
                    />
                  </div>
                  {/*Author Data*/}
                  <div className="col-12 col-md-10">
                    <h5 className="font-weight-bold dark-grey-text mb-3">
                      <strong>
                        {this.state.Author.firstName +
                          " " +
                          this.state.Author.lastName}
                      </strong>
                    </h5>
                    <div
                      className="personal-sm pb-3"
                      href={this.state.Author.facebookUrl}
                    >
                      <a className="fb-ic pr-2">
                        <i className="fab fa-facebook-f mr-2"> </i>
                      </a>
                      <a
                        className="tw-ic pr-2"
                        href={this.state.Author.twitterUrl}
                      >
                        <i className="fab fa-twitter mr-2"> </i>
                      </a>
                      <a
                        className="gplus-ic pr-2"
                        href={this.state.Author.facebookUrl}
                      >
                        <i className="fab fa-google-plus-g mr-2"> </i>
                      </a>
                      <a className="li-ic pr-2">
                        <i
                          className="fab fa-linkedin-in mr-2"
                          href={this.state.Author.linkedInUrl}
                        >
                          {" "}
                        </i>
                      </a>
                    </div>
                    <p>{this.state.Author.description}</p>
                  </div>
                </div>
              </div>
            </section>
            <CommentForm postId={this.state.Post.id} />
            <Comments Comments={this.state.Comments} />
          </div>
        )}
        <Footer />
      </>
    );
  }
}

export default Post;
