import React from 'react';
import {connect} from 'react-redux';
import {updateUser, getCurrentUser} from '../../actions/users_actions';

@connect((store) => {
  return {
    currentUser: store.currentUser
  };
})
export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: ''
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changeRole = this.changeRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getCurrentUser(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.currentUser.item);
  }

  changeEmail(event) {
    this.setState({...this.state, email: event.target.value});
  }

  changeRole(event) {
    this.setState({...this.state, role: event.target.value});
  }

  handleSubmit() {
    const user = {...this.state, id: this.props.currentUser.item.id};
    this.props.dispatch(updateUser(user));
  }

  render() {
    return <div className="col-lg-4 col-lg-offset-4">
      <h1>Update User</h1>
      <form onSubmit={this.handleSubmit}>
        <label className="sr-only">Email</label>
        <input type="email" value={this.state.email} onChange={this.changeEmail} className="form-control" placeholder="Email" required='true'/>
        <label className="sr-only">Role</label>
        <input type="text" value={this.state.role} onChange={this.changeRole} className="form-control" placeholder="Role" required='true'/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
      </form>
    </div>
  }
}