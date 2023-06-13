const { renderFile } = require('ejs');
const Post= require('../models/post');

module.exports.create = function(req, res) {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user: req.body._id
    })
    .then(function(post) {
        // Post creation successful
        console.log("Post created successfully");
        return res.redirect('back');
    })
    .catch(function(err) {
        // Error in creating post
        console.log("Error in creating post:", err);
        return res.redirect('back');
    });
};
