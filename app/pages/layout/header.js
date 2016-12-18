import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    const {role} = this.props;
    const links = getLinks(role).map((link, i) => <li key={i}>{link}</li>);

    return <nav className="navbar navbar-default">
      <div className="container">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Expensivo</a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              {links}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  }
}

function getLinks(role) {
  if (role === 'user') {
    return [
      <Link to="/expenses">My expenses</Link>,
      <Link to="/expenses/new">New expense</Link>,
      <Link to="/print">Print</Link>
    ];
  } else if (role === 'user_manager') {
    return [
      <Link to="/expenses">My expenses</Link>,
      <Link to="/expenses/new">New expense</Link>,
      <Link to="/print">Print</Link>,
      <Link to="/users">Users</Link>
    ];
  } else if (role === 'admin') {
    return [
      <Link to="/expenses">My expenses</Link>,
      <Link to="/expenses/new">New expense</Link>,
      <Link to="/print">Print</Link>,
      <Link to="/users">Users</Link>,
      <Link to="/expenses?view=all">All expenses</Link>
    ];
  } else {
    return [];
  }
}