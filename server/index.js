const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const authParser = require('express-auth-parser');
const auth = require('./auth');
const users = require('./users');
const expenses = require('./expenses');
const PORT = 1337;
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(authParser);

app.use('/auth', auth);
app.use('/users', users);
app.use('/expenses', expenses);
app.use('/app', express.static(path.join(__dirname, '../app')));

app.listen(PORT, function () {
  console.log(`Expensivo running on port ${PORT}`);
});

