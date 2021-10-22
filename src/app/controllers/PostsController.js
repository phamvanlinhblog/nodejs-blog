const Post = require('../models/post');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
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
            .then(() => res.redirect('list'))
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

    // [GET] /posts/edit
    list(req, res, next) {
        Post.find({})
            .then((posts) => {
                res.render('posts/list', {
                    posts: multipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }

    // [GET] /posts/:id/update
    update(req, res, next) {
        Post.findById(req.params.id)
            .then((post) => {
                res.render('posts/update', { post: mongooseToObject(post) });
            })
            .catch(next);
    }

    // [PUT] /posts/:id
    putUpdate(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('list'))
            .catch(next);
    }
}

module.exports = new PostsController();
