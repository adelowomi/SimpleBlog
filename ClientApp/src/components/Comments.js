import React, { Component } from "react";

class Comments extends Component {
  state = {
    Comments: this.props.Comments,
  };

  componentDidMount() {
    console.log(this.props.Comments);
  }
  render() {
    return (
      <section className="mb-4 pt-5 wow fadeIn" data-wow-delay="0.3s">
        {/*Main wrapper*/}
        <div className="comments-list text-center text-md-left mb-5">
          <div className="text-center mb-4">
            <h3 className="font-weight-bold pt-3 mb-5">
    Comments <span className="badge mygreen">{this.state.Comments.length}</span>
            </h3>
          </div>
          {/*First row*/}
          {this.state.Comments.map((comment, index) => 
            <div className="row mb-4">
            {/*Image column*/}
            <div className="col-sm-2 col-12 mb-md-0 mb-3">
              <img
                src="https://via.placeholder.com/489/a8a8a8/808080?text=."
                className="avatar rounded-circle z-depth-1-half"
              />
            </div>
            {/*/.Image column*/}
            {/*Content column*/}
            <div className="col-sm-10 col-12">
              <a>
                <h4 className="font-weight-bold">{comment.name}</h4>
              </a>
              <div className="mt-2">
                <ul className="list-unstyled">
                  <li className="comment-date">
                    <i className="fas fa-clock" />{" "}
                    {comment.dateCreated}
                  </li>
                </ul>
              </div>
              <p className="grey-text">{comment.message}</p>
            </div>
            {/*/.Content column*/}
          </div>
          )}
          
          {/*/.First row*/}
        </div>
      </section>
    );
  }
}

export default Comments;
