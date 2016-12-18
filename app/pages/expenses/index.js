import React from 'react';
import {connect} from 'react-redux';
import Expense from './expense';
import {getAllExpenses, removeExpense} from '../../actions/expenses_actions';
import {updateAmountFrom, updateAmountTo} from '../../actions/filter_actions';

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

  render() {
    const {from, to} = this.props.filter.amount;
    const expenses = this.props.expenses.items
      .filter((item) => {
        const f = parseInt(from, 10);
        const t = parseInt(to, 10);
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
      <div>
        <label>Amount</label>
        <input type="number" value={from} onChange={this.changeAmountFrom.bind(this)} placeholder="from"/>
        <input type="number" value={to} onChange={this.changeAmountTo.bind(this)} placeholder="to"/>
      </div>
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
  }
}