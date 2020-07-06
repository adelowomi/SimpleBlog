import React, { Component } from "react";
import {Link} from 'react-router-dom'

export default class RecentPostCard extends Component {
  state = {
    Post: this.props.post,
  };
  render() {
    return (
      <>
        <div className="col-lg-4 mb-4">
          <div className="view overlay z-depth-1">
            <img
              src="/img/postcard.jpg"
              className="img-fluid"
              alt="First sample"
            />
            <a href="/">
              <div className="mask rgba-white-slight" />
            </a>
          </div>
        </div>
        <div className="col-lg-7 mb-4">
          <a href="postpage.html" className="mygreen-text">
            <h6 className="pb-1">
              <i className="fas fa-heart" />
              <strong> {this.state.Post.category.name} </strong>
            </h6>
          </a>
          <a href="postpage.html ">
            <h4 className="mb-4 text-black font-weight-bold ">
              {this.state.Post.title}
            </h4>
          </a>
          <p>{this.state.Post.quote}</p>
          <p>
            by{" "}
            <a href="/">
              <strong>
                {this.state.Post.author.firstName +
                  " " +
                  this.state.Post.author.lastName}
              </strong>
            </a>
            , {this.state.Post.DateCreated}
          </p>
          <Link
            to={"/post/" + this.state.Post.id}
            className="btn btn-mygreen text-white "
          >
            Read more
          </Link>
        </div>
      </>
    );
  }
}
