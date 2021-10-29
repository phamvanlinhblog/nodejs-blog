const Post = require('../models/post');
const jwt = require('jsonwebtoken');

module.exports = function PostsMiddleware(req, res, next) {
    console.log(res.locals);
    var postId = req.params.id;
    var userCookie = req.signedCookies.userCookie;
    var userId = jwt.verify(userCookie, process.env.JWT_KEY);
    if (res.locals.user.role !== 'admin') {
        Post.findOneWithDeleted({ _id: postId }, function (err, post) {
            if (!post) {
                res.redirect('/');
                return;
            }
            if (post.author !== userId._id) {
                res.redirect('/');
                return;
            } else {
                next();
            }
        });
    } else {
        next();
    }
};
