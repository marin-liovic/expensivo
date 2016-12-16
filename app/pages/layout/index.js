import React from 'react';
import {connect} from 'react-redux';
import Header from './header';
import Footer from './footer';

@connect((store) => {
  return {
    authentication: store.authentication,
    error: store.error
  };
})
export default class Layout extends React.Component {
  render() {
    const header = this.props.authentication.isAuthenticated ? <Header /> : undefined;
    const {message} = this.props.error;
    if (message) {
      alert(message);
    }

    return <div>
      {header}
      <div className="container">
        {this.props.children}
      </div>
      <Footer />
    </div>
  }
}