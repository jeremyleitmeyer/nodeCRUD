const bodyParser = require('body-parser');
const User = require('../models/user');
const Post = require('../models/post');

module.exports = (app) => {
  
  app.post('/posts', (req, res, next) => {
    var currentUser = User.findOne({
      'id': req.user._id
    }, (err, user) => {
      var newPost = new Post();
      newPost.title = req.body.title;
      newPost.content = req.body.content
      newPost.userId = req.user._id


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
