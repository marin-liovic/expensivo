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
    const component = this.props.children.type.WrappedComponent || {};
    const {isAuthenticated, me} = this.props.authentication;
    const header = isAuthenticated && shouldRenderMeta(component) ? <Header role={me.role}/> : undefined;
    const footer = shouldRenderMeta(component) ? <Footer /> : undefined;
    const {message} = this.props.error;
    if (message) {
      alert(message);
    }

    return <div>
      {header}
      <div className="container">
        {this.props.children}
      </div>
      {footer}
    </div>
  }
}

function shouldRenderMeta(component) {
  return component.name !== 'Print';
}
