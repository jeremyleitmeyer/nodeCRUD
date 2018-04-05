var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: String,
    content: String,
    comments: Array
});
// pushes in user:text pair when comment submits


module.exports = mongoose.model('Post', postSchema);
