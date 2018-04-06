const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {

  // required for persistent login sessions
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      User.findOne({
        'local.email': email
      }, (err, user) => {
        // if there are any errors, return the error
        if (err) {
          return done(err);
        }
        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          // if there is no user with that email
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          console.log(newUser.local)
          newUser.save((err) => {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {

    User.findOne({
      'local.email': email
    }, (err, user) => {
      if (err)
        return done(err);
      // if no user is found, return the message
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      // checking if password is valid
      if (!validPassword(user, password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      //return successful user
      return done(null, user);
    });

  }));


  var validPassword = (user, password) => {
    return bcrypt.compareSync(password, user.local.password);
  };

};
