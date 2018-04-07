const User = require('../models/user');
const Post = require('../models/post');

module.exports = (app, passport) => {



  app.get('/login', (req, res) => {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/posts',
    failureRedirect: '/login',
    failureFlash: true
  }));


  app.get('/signup', (req, res) => {

    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/posts',
    failureRedirect: '/signup',
    failureFlash: true
  }), (req, res) => {
    console.log(req)
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
