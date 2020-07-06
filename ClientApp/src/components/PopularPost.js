import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class PopularPost extends Component {
    render() {
        return (
                <div className="col-lg-4 col-md-8 mb-4 ">
                    <div className="view overlay z-depth-1 mb-2 ">
                        <img src="https://via.placeholder.com/489/a8a8a8/808080?text=. " className="img-fluid " alt="First sample image " />
                        <a>
                            <div className="mask rgba-white-slight " />
                        </a>
                    </div>
                    <a href=" " className="mygreen-text ">
                        <h6 className="mb-3 mt-3 "><i className="fas fa-music " /><strong> Music</strong></h6>
                    </a>
                    <a><h4 className="mb-3 font-weight-bold ">{this.props.post.title}</h4></a>
                    <p>Posted on <a><strong>{this.props.post.dateCreated}</strong></a>, 15/07/2016</p>
                    <p>{this.props.post.title}</p>
                    <Link className="btn btn-mygreen" to={`post/${this.props.post.id}`}>Read more</Link>
                </div>


        )
    }
}
