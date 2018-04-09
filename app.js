const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

mongoose.connect('mongodb://jeremyleitmeyer:7A1s2d98@ds135619.mlab.com:35619/nodeblog', {
  useMongoClient: true
}); 
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error: %s', err);
});
mongoose.set('debug', true);

require('./config/passport')(passport);

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// required for passport
app.use(session({
  secret: 'testnodeblog',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./routes/authRoutes.js')(app, passport);
require('./routes/genRoutes.js')(app)

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on ' + port);
