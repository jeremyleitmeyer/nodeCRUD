const bodyParser = require('body-parser');
const User = require('../models/user');
const Post = require('../models/post');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, (req, res) => {

    var posts = Post.find({
      'userId': req.user._id
    }, (err, posts) => {
      if (!posts) {
        res.render('profile.ejs', {
          user: req.user
        });
      } else {
        res.render('profile.ejs', {
          user: req.user,
          posts: posts
        });
      }
    });
  });

  app.get('/posts', isLoggedIn, (req, res) => {
    var posts = Post.find({}, (err, posts) => {
      res.render('posts.ejs', {
        posts: posts
      });
    });
  });


  app.post('/posts', (req, res, next) => {
    var currentUser = User.findOne({
      'id': req.user._id
    }, (err, user) => {
      var newPost = new Post();
      newPost.title = req.body.title;
      newPost.content = req.body.content
      newPost.user.userId = req.user._id
      newPost.user.email = req.user.local.email

      newPost.save((err) => {
        if (err)
          throw err;

        req.user.posts.push(newPost._id)
        req.user.save((err) => {
          res.redirect('/profile')
        })
      });
    });
  })
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
