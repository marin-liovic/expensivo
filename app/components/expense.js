import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
const TIME_FORMAT = 'DD.MM.YYYY. HH:mm';

export default class Expense extends React.Component {
  render() {
    const {id, timestamp, description, amount, comment, onDelete, print} = this.props;
    const links = print
      ? undefined
      : <td>
        <Link className="btn btn-xs btn-warning" to={`/expenses/${id}/edit`}>Edit</Link>
        <button className="btn btn-xs btn-danger" onClick={onDelete}>Delete</button>
      </td>;

    return <tr>
      <td>{description}</td>
      <td>{amount}</td>
      <td>{moment(timestamp).format(TIME_FORMAT)}</td>
      <td>{comment}</td>
      {links}
    </tr>
  }
}