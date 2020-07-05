import React, { Component } from 'react';
import Navbar from './Navbar';
import Body from './Body'
import Footer from './Footer';
import Headers from './Headers';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Headers />
        <Navbar />
        <Body />
        <Footer />
      </div>
    );
  }
}
