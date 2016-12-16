import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return <ul className="nav navbar-nav navbar-right">
      <li><Link to="/expenses">My expenses</Link></li>
      <li><Link to="/expenses/new">New expense</Link></li>
    </ul>
  }
}