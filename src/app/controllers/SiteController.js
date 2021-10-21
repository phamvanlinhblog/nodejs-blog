// Import models Post
const Post = require('../models/post');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /
    home(req, res, next) {
        Post.find({})
            /**
             * Post.find({}, function(error, posts) {
             *     res.json('posts')
             * })
             *  Trả về Object posts để render vào trang home
             * */
            .then((posts) => {
                res.render('home', { posts: multipleMongooseToObject(posts) });
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
