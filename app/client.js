import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import Layout from './pages/layout';
import Welcome from './pages/welcome';
import Signup from './pages/signup';
import Login from './pages/login';
import Expenses from './pages/expenses'
import NewExpense from './pages/new_expense';
import EditExpense from './pages/edit_expense';
import Users from './pages/users';
import EditUser from './pages/edit_user';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Welcome}></IndexRoute>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/expenses" component={Expenses}></Route>
      <Route path="/expenses/new" component={NewExpense}></Route>
      <Route path="/expenses/:id/edit" component={EditExpense}></Route>
      <Route path="/users" component={Users}></Route>
      <Route path="/users/:id/edit" component={EditUser}></Route>
    </Route>
  </Router>
  </Provider>
  , app);