import React, { Component } from 'react'
import PopularPost from './PopularPost'

export default class PopularPosts extends Component {
    render() {
        return (
          <section className="section extra-margins pb-3 text-center text-lg-left wow fadeIn " data-wow-delay="0.3s ">
            <h2 className="font-weight-bold text-center h1 my-5 ">Popular posts</h2>
            <div className="container ">
              <div className="row ">
              <PopularPost />
              </div>
            </div>
          </section>

        )
    }
}
