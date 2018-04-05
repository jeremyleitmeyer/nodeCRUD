var Post = require('../models/post');

module.exports = (app) => {
  app.post('/posts', (req, res, next) => {
    //GRAB THE REQ DATA YOOOOOOOO
    // if there is no user with that email
    var newPost = new Post();

    newPost.title = title;
    newPost.content = content

    newPost.save((err) => {
      if (err)
        throw err;
      return done(null, newPost);
    });
  });
}
