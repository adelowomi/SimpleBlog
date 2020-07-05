import React, { Component } from "react";

export default class Spinner extends Component {
  state={
    size: this.props.size,
    color: this.props.color
  }
  render() {
    return (
      <>
        <div
          className={
            "preloader-wrapper" + " " + this.state.size + " " + "active crazy"
          }
        >
          <div className={"spinner-layer spinner-"+ this.state.color +"-only"}>
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
