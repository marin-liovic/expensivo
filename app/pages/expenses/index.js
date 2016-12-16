import React from 'react';
import {connect} from 'react-redux';
import Expense from './expense';
import {getAllExpenses, removeExpense} from '../../actions/expenses_actions';

@connect((store) => {
  return {
    expenses: store.expenses
  };
})
export default class Expenses extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllExpenses());
  }

  onDelete(id) {
    return () => this.props.dispatch(removeExpense(id))
  }
  
  render() {
    const expenses = this.props.expenses.items.map((expense) =>
      <Expense key={expense.id}
               timestamp={expense.timestamp}
               description={expense.description}
               amount={expense.amount}
               comment={expense.comment}
               onDelete={this.onDelete(expense.id).bind(this)}
      ></Expense>);

    return <table className="table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {expenses}
      </tbody>
    </table>
    // return <div>
    //   <h1>Your expenses</h1>
    //   <ul>
    //     {expenses}
    //   </ul>
    // </div>
  }
}