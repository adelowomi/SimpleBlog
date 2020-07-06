import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Home } from './components/Home';
import Post from './components/Post'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <>    
        <Route exact path='/' component={Home} />
        <Route path='/post/:postId' component={Post} />
        <Route path='/register' component={SignUp} />
        <Route path='/login' component={SignIn} />
        <Route path='/dashboard' component={Dashboard}/>
      </>
    );
  }
}
