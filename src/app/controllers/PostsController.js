const Post = require('../models/post');
const { mongooseToObject } = require('../../util/mongoose');

class PostsController {
    // [GET] /posts/:slug
    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then((post) => {
                res.render('posts/show', { post: mongooseToObject(post) });
            })
            .catch(next);
    }
}

module.exports = new PostsController();
