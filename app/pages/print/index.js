import React from 'react';
import {connect} from 'react-redux';
import groupBy from 'lodash.groupby';
import moment from 'moment';
import {getAllExpenses} from '../../actions/expenses_actions';
import Week from './week';

@connect((store) => {
  return {
    expenses: store.expenses
  };
})
export default class Print extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllExpenses());
  }

  render() {
    const {items} = this.props.expenses;
    const weeks = getWeekData(items)
      .map((item, i) =>
        <Week key={i}
              week={item.week}
              total={item.total}
              average={item.average}
        ></Week>);

    return <div>
      <h1>Expenses per week</h1>
      <table className="table">
        <thead>
        <tr>
          <th>Week</th>
          <th>Total</th>
          <th>Day average</th>
        </tr>
        </thead>
        <tbody>
        {weeks}
        </tbody>
      </table>
    </div>
  }
}

function getWeekData(items) {
  const DATE_FORMAT = 'DD.MM.YYYY';
  const groupedResults = groupBy(items, function (item) {
    return moment(item.timestamp).startOf('isoWeek').format(DATE_FORMAT);
  });
  const weekNames = Object.keys(groupedResults);
  const data = weekNames.map((name) => {
    const expenses = groupedResults[name];
    const total = expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
    const average = (total / 7).toFixed(2);
    const start = moment(name, DATE_FORMAT);
    let week = start.format(DATE_FORMAT);
    start.add(6, 'days');
    week = `${week} - ${start.format(DATE_FORMAT)}`;
    return {week, total, average};
  });
  return data;
}