var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    posted: { type: Date, default: Date.now },
    title: String,
    content: String,
    user: {
        userId: String,
        email: String
    },
    comments: Array
});


module.exports = mongoose.model('Post', postSchema);
