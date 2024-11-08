var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Client } = require('pg'); // Import PostgreSQL client

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Test route for DB connection and environment variables
app.get('/test-db-connection', async (req, res) => {
  const dbServer = process.env.DB_SERVER;
  const dbPort = process.env.DB_PORT;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbDatabase = process.env.DB_DATABASE;

  // Check if all required environment variables are available
  if (!dbServer || !dbPort || !dbUser || !dbPassword || !dbDatabase) {
    return res.status(500).send('Missing one or more environment variables');
  }

  // Create a PostgreSQL client and try to connect to the database
  const client = new Client({
    user: dbUser,
    host: dbServer,
    database: dbDatabase,
    password: dbPassword,
    port: dbPort,
  });

  try {
    await client.connect();
    res.send('Successfully connected to the database!');
  } catch (err) {
    res.status(500).send('Failed to connect to the database: ' + err.message);
  } finally {
    client.end();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;