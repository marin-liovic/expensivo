import React from 'react';
import {connect} from 'react-redux';
import Header from './header';
import Footer from './footer';
import Alert from './alert';
import {dismissAlert} from '../../actions/layout_actions';

@connect((store) => {
  return {
    authentication: store.authentication,
    error: store.error
  };
})
export default class Layout extends React.Component {

  dismissAlert() {
    this.props.dispatch(dismissAlert());
  }

  render() {
    const component = this.props.children.type.WrappedComponent || {};
    const {me} = this.props.authentication;
    const header = shouldRenderMeta(component) ? <Header role={me.role}/> : undefined;
    const footer = shouldRenderMeta(component) ? <Footer/> : undefined;
    const {message} = this.props.error;
    const alert = message ? <Alert message={message} onClose={this.dismissAlert.bind(this)}/> : undefined;

    return <div>
      {header}
      <div className="container">
        {alert}
        {this.props.children}
      </div>
      {footer}
    </div>
  }
}

function shouldRenderMeta(component) {
  return component.name !== 'Print';
}
