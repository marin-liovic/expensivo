import React from 'react';

export default class Expense extends React.Component {
  render() {
    const {timestamp, description, amount, comment, onDelete} = this.props;
    return <tr>
      <td>{timestamp}</td>
      <td>{amount}</td>
      <td>{description}</td>
      <td>{comment}</td>
      <td>
        <button className="btn btn-xs btn-warning">Edit</button>
        <button className="btn btn-xs btn-danger" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  }
}