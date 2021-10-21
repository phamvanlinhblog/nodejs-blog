const Post = require('../models/post');
const { mongooseToObject } = require('../../util/mongoose');
class PostsController {
    // [GET] /posts/create
    create(req, res, next) {
        res.render('posts/create');
    }
    // [POST] /posts/store
    store(req, res, next) {
        // Tạo post mới theo model Post
        const post = new Post(req.body);
        // Save vào DB
        post.save()
            // save xong thì chuyển hướng
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

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
