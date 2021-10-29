const Post = require('../models/post');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const jwt = require('jsonwebtoken');

class MeController {
    posts(req, res, next) {
        var userCookie = req.signedCookies.userCookie;
        var userId = jwt.verify(userCookie, process.env.JWT_KEY);
        console.log(userId._id);
        Promise.all([
            Post.find({ author: userId._id }),
            Post.countDocumentsDeleted(),
        ])
            .then(([posts, deletedCount]) => {
                res.render('posts/list', {
                    posts: multipleMongooseToObject(posts),
                    deletedCount,
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
