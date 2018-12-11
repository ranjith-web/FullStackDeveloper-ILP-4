var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

var indexRouter = require('./server/routes/index');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist/issue-tracker')));

app.use('/issueTracker', indexRouter);

// catch 404 and forward to error handler
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/issue-tracker/index.html'));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function(){
  console.log(`Running on localhost: ${port}`);
});

