import React from 'react';

export default class Alert extends React.Component {
  render() {
    const {message, onClose} = this.props;
    return <div className="alert alert-warning alert-dismissible" role="alert">
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      {message}
    </div>
  }
}
