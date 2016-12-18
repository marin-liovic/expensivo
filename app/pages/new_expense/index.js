import React from 'react';
import {connect} from 'react-redux';
import {newExpense} from '../../actions/expenses_actions';

@connect(() => {return {};})
export default class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: '',
      amount: '',
      description: '',
      comment: ''
    };
    this.changeTimestamp = this.changeTimestamp.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeTimestamp(event) {
    this.setState({...this.state, timestamp: event.target.value});
  }

  changeAmount(event) {
    this.setState({...this.state, amount: event.target.value});
  }

  changeDescription(event) {
    this.setState({...this.state, description: event.target.value});
  }

  changeComment(event) {
    this.setState({...this.state, comment: event.target.value});
  }

  handleSubmit() {
    this.props.dispatch(newExpense(this.state));
  }
  
  render() {
    return <div className="col-lg-4 col-lg-offset-4">
      <h1>New Expense</h1>
      <form onSubmit={this.handleSubmit}>
        <label className="sr-only">Description</label>
        <input type="text" value={this.state.description} onChange={this.changeDescription} className="form-control" placeholder="Description" required='true'/>
        <label className="sr-only">Amount</label>
        <input type="number" value={this.state.amount} onChange={this.changeAmount} className="form-control" placeholder="Amount" required='true'/>
        <label className="sr-only">Time</label>
        <input type="datetime" value={this.state.timestamp} onChange={this.changeTimestamp} className="form-control" placeholder="Time" required='true'/>
        <label className="sr-only">Comment</label>
        <input type="text" value={this.state.comment} onChange={this.changeComment} className="form-control" placeholder="Comment"/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
      </form>
    </div>
  }
}