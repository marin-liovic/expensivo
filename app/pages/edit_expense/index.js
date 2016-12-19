import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {updateExpense, getCurrentExpense} from '../../actions/expenses_actions';

@connect((store) => {
  return {
    currentExpense: store.currentExpense
  };
})
export default class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {},
      time: {},
      amount: '',
      description: '',
      comment: ''
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getCurrentExpense(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const newState = nextProps.currentExpense.item;
    if (newState.timestamp) {
      newState.date = new Date(newState.timestamp);
      newState.time = new Date(newState.timestamp);
    }
    this.setState(newState);
  }

  changeDate(event, date) {
    this.setState({...this.state, date});
  }

  changeTime(event, time) {
    this.setState({...this.state, time});
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
    const {date, time} = this.state;
    const timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
      time.getHours(), time.getMinutes());
    const data = {...this.state, id: this.props.currentExpense.item.id, timestamp};
    this.props.dispatch(updateExpense(data));
  }

  render() {
    return <div className="col-lg-4 col-lg-offset-4">
      <h1>Update Expense</h1>
      <form onSubmit={this.handleSubmit}>
        <label className="sr-only">Description</label>
        <input type="text" value={this.state.description} onChange={this.changeDescription} className="form-control" placeholder="Description" required='true'/>
        <label className="sr-only">Amount</label>
        <input type="number" step="0.01" min="0.01" value={this.state.amount} onChange={this.changeAmount} className="form-control" placeholder="Amount" required='true'/>
        <DatePicker hintText="Date" value={this.state.date} onChange={this.changeDate}/>
        <TimePicker format="24hr" hintText="Time" value={this.state.time} onChange={this.changeTime}/>
        <label className="sr-only">Comment</label>
        <input type="text" value={this.state.comment} onChange={this.changeComment} className="form-control" placeholder="Comment"/>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>
      </form>
    </div>
  }
}