import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router';
import Expense from '../../components/expense';
import {getAllExpenses, removeExpense} from '../../actions/expenses_actions';
import {updateAmountFrom, updateAmountTo, updateDateFrom, updateDateTo} from '../../actions/filter_actions';

@connect((store) => {
  return {
    expenses: store.expenses,
    filter: store.filter
  };
})
export default class Expenses extends React.Component {

  componentDidMount() {
    const {view} = this.props.location.query;
    this.props.dispatch(getAllExpenses({view}));
  }

  componentWillReceiveProps(nextProps) {
    const currentView = this.props.location.query.view;
    const {view} = nextProps.location.query;
    if (currentView !== view) {
      this.props.dispatch(getAllExpenses({view}));
    }
  }

  onDelete(id) {
    const {view} = this.props.location.query;
    return () => this.props.dispatch(removeExpense(id, view))
  }

  changeAmountFrom(e) {
    this.props.dispatch(updateAmountFrom(e.target.value));
  }

  changeAmountTo(e) {
    this.props.dispatch(updateAmountTo(e.target.value));
  }

  changeDateFrom(e, date) {
    this.props.dispatch(updateDateFrom(date));
  }

  changeDateTo(e, date) {
    this.props.dispatch(updateDateTo(date));
  }

  render() {
    const {amount, date} = this.props.filter;
    const printLink = `/print?date_from=${date.from && date.from.toISOString()}&date_to=${date.to && date.to.toISOString()}`;
    const expenses = this.props.expenses.items
      .filter((item) => {
        const f = parseInt(amount.from, 10);
        const t = parseInt(amount.to, 10);
        const isHigher = isNaN(f) ? true : item.amount > f;
        const isLower = isNaN(t) ? true : item.amount < t;
        return isHigher && isLower;
      })
      .map((expense) =>
      <Expense key={expense.id}
               id={expense.id}
               timestamp={expense.timestamp}
               description={expense.description}
               amount={expense.amount}
               comment={expense.comment}
               onDelete={this.onDelete(expense.id).bind(this)}
      ></Expense>);

    return <div>
      <h1>My Expenses</h1>
      <div className="col-lg-4">
        <div>
          <label>Amount:</label>
          <div>
            <input type="number" value={amount.from} onChange={this.changeAmountFrom.bind(this)} placeholder="from"/>
            <input type="number" value={amount.to} onChange={this.changeAmountTo.bind(this)} placeholder="to"/>
          </div>
        </div>
        <div>
          <label>Date:</label>
          <div>
            <DatePicker hintText="from" value={date.from} onChange={this.changeDateFrom.bind(this)}/>
            <DatePicker hintText="to" value={date.to} onChange={this.changeDateTo.bind(this)}/>
            <Link to={printLink}>
              <button className="btn btn-primary btn-print">Print</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <table className="table">
          <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Time</th>
            <th>Comment</th>
          </tr>
          </thead>
          <tbody>
          {expenses}
          </tbody>
        </table>
      </div>
    </div>
  }
}