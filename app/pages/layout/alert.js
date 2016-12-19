import React from 'react';

export default class Alert extends React.Component {
  render() {
    const {message, type, onClose} = this.props;
    const className = `alert alert-${type} alert-dismissible`;
    return <div className={className} role="alert">
      <button type="button" className="close" onClick={onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      {message}
    </div>
  }
}
