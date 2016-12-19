import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../../actions/authentication_actions';

@connect((store) => {
  return {
    authentication: store.authentication
  };
})
export default class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch(logout());
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    const {isAuthenticated} = nextProps.authentication;
    if (!isAuthenticated) {
      this.context.router.push('/');
      return false;
    }
    return true;
  }

  render() {
    return null;
  }
};