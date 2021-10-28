// Import models Post
const Post = require('../models/post');
const User = require('../models/user');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    home(req, res, next) {
        Post.find({})
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseToObject(posts),
                    name: res.locals.user.name,
                });
            })
            .catch(next);
    }

    // [POST] /
    post(req, res) {
        console.log(req.body);
        res.send('Done!');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
