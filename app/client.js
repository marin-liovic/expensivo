import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import Print from './pages/print';
import Logout from './pages/logout';
import {isAuthenticated} from './utils/auth_utils';

const app = document.getElementById('app');

function requireAuth(nextState, replaceState) {
  if (!isAuthenticated()) {
    replaceState('/')
  }
}

function forwardLoggedIn(nextState, replaceState) {
  if (isAuthenticated()) {
    replaceState('/expenses')
  }
}

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Welcome} onEnter={forwardLoggedIn}></IndexRoute>
          <Route path="/signup" component={Signup} onEnter={forwardLoggedIn}></Route>
          <Route path="/login" component={Login} onEnter={forwardLoggedIn}></Route>
          <Route path="/logout" component={Logout} onEnter={requireAuth}></Route>
          <Route path="/expenses" component={Expenses} onEnter={requireAuth}></Route>
          <Route path="/expenses/new" component={NewExpense} onEnter={requireAuth}></Route>
          <Route path="/expenses/:id/edit" component={EditExpense} onEnter={requireAuth}></Route>
          <Route path="/users" component={Users} onEnter={requireAuth}></Route>
          <Route path="/users/:id/edit" component={EditUser} onEnter={requireAuth}></Route>
          <Route path="/print" component={Print} onEnter={requireAuth}></Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
  , app);
