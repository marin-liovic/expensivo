import React from 'react';
import {connect} from 'react-redux';
import User from './user';
import {getAllUsers, removeUser} from '../../actions/users_actions';

@connect((store) => {
  return {
    users: store.users
  };
})
export default class Users extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllUsers());
  }

  onDelete(id) {
    return () => this.props.dispatch(removeUser(id))
  }

  render() {
    const users = this.props.users.items.map((user) =>
      <User key={user.id}
            id={user.id}
            email={user.email}
            role={user.role}
            onDelete={this.onDelete(user.id).bind(this)}
      ></User>);

    return <div>
      <h1>Users</h1>
      <table className="table">
        <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {users}
        </tbody>
      </table>
    </div>
  }
}