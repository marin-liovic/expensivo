import React from 'react';

export default class Week extends React.Component {
  render() {
    const {week, total, average} = this.props;
    return <tr>
      <td>{week}</td>
      <td>{total}</td>
      <td>{average}</td>
    </tr>
  }
}