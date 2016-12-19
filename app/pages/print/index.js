import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Expense from '../../components/expense';
import {getAllExpenses} from '../../actions/expenses_actions';
const DATE_FORMAT = 'DD.MM.YYYY.';

@connect((store) => {
  return {
    expenses: store.expenses
  };
})
export default class Print extends React.Component {

  componentDidMount() {
    const {date_from, date_to} = this.props.location.query;
    this.props.dispatch(getAllExpenses({date_from, date_to}));
  }

  render() {
    const {items} = this.props.expenses;
    const momentFrom = moment(this.props.location.query.date_from);
    const momentTo = moment(this.props.location.query.date_to);
    const dateFrom = momentFrom.format(DATE_FORMAT);
    const dateTo = momentTo.format(DATE_FORMAT);
    const total = items.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
    const days = momentTo.diff(momentFrom, 'days');
    const average = days > 0 ? (total/days).toFixed(2) : 'Cannot calculate. Check dates!';
    const expenses = items
      .map((expense) =>
        <Expense key={expense.id}
                 id={expense.id}
                 timestamp={expense.timestamp}
                 description={expense.description}
                 amount={expense.amount}
                 comment={expense.comment}
                 print="true"
        ></Expense>);

    return <div>
      <h1>Expenses for: {dateFrom} - {dateTo}</h1>
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
      <hr/>
      <div>
        Total: {total}
      </div>
      <div>
        Average per day: {average}
      </div>
    </div>
  }
}
