import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../../actions/authentication_actions';

@connect((store) => {
  return {
    authentication: store.authentication
  };
})
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.authentication.isAuthenticated) {
      this.context.router.push('/expenses');
      return false;
    }
    return true;
  }

  changeEmail(event) {
    this.setState({...this.state, email: event.target.value});
  }

  changePassword(event) {
    this.setState({...this.state, password: event.target.value});
  }

  handleSubmit() {
    this.props.dispatch(signup(this.state));
  }

  render() {
    return <div className="col-lg-4 col-lg-offset-4">
      <form onSubmit={this.handleSubmit}>
        <h2 className="form-signin-heading">Create an account</h2>
        <label htmlFor="email" className="sr-only">Email address</label>
        <input type="email" value={this.state.email} onChange={this.changeEmail} className="form-control" placeholder="Email address" required='true'/>
        <label htmlFor="password" className="sr-only">Password</label>
        <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control" placeholder="Password" required='true'/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
      </form>
    </div>
  }
}