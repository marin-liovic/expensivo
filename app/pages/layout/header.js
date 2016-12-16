import React from 'react';
import UserLinks from './user_links';

export default class Header extends React.Component {
  render() {
    return <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Expensivo</a>
        </div>
        <div className="collapse navbar-collapse">
          <UserLinks></UserLinks>
        </div>
      </div>
    </nav>
  }
}