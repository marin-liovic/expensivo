import React from 'react';
import {Link} from 'react-router';

export default class User extends React.Component {
  render() {
    const {id, email, role, onDelete} = this.props;
    return <tr>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <Link className="btn btn-xs btn-warning" to={`/users/${id}/edit`}>Edit</Link>
        <button className="btn btn-xs btn-danger" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  }
}