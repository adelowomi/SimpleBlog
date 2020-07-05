import React, { Component } from 'react'

export default class PopularPost extends Component {
    render() {
        return (
                <div className="col-lg-4 col-md-12 mb-4 ">
                    <div className="view overlay z-depth-1 mb-2 ">
                        <img src="https://via.placeholder.com/489/a8a8a8/808080?text=. " className="img-fluid " alt="First sample image " />
                        <a>
                            <div className="mask rgba-white-slight " />
                        </a>
                    </div>
                    <a href=" " className="mygreen-text ">
                        <h6 className="mb-3 mt-3 "><i className="fas fa-music " /><strong> Music</strong></h6>
                    </a>
                    <a><h4 className="mb-3 font-weight-bold ">This is title of the news</h4></a>
                    <p>by <a><strong>Billy Forester</strong></a>, 15/07/2016</p>
                    <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
    placeat facere possimus voluptas.</p>
                    <a className="btn btn-mygreen ">Read more</a>
                </div>


        )
    }
}
