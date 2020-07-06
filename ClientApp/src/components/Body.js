import React, { Component } from "react";
import Banner from "./Banner";
import Connect from "../utilities/Connect";
import Spinner from "../utilities/Spinner";
import RecentPostCard from './RecentPostCard'

export default class Body extends Component {
  state = {
    recentPosts: [],
    popularPosts: [],
    Posts: [],
    loading: false,
  };
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    this.setState({ loading: true });
    Connect("post/list", "get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({ Posts: data.data, loading: false });
        }
      });
  }
  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="mx-auto text-center mt-5">
          <Spinner size="big" color="blue" />
        </div>
        ) : (
          <>
            <Banner />
            <section
              className="section extra-margins pb-3 text-center text-lg-left wow fadeIn"
              data-wow-delay="0.3s"
            >
              <h2 className="font-weight-bold text-center h1 my-5">
                Recent posts
              </h2>
              <div className="container">
                <div className="row">
                    {this.state.Posts.map((post, index) => 
                        <RecentPostCard post={post} key={index}/>
                    )}
                  
                </div>
              </div>
            </section>
          </>
        )}
      </>
    );
  }
}
