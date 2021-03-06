import React from 'react';
import {Link} from 'react-router';

export default class Welcome extends React.Component {
  render() {
    return <div className="welcome">
      <h1>Welcome to Expensivo, your personal expenses tracker!</h1>
      <h2>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>.</h2>
    </div>
  }
}