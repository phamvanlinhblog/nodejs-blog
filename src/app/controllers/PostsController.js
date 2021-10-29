const Post = require('../models/post');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
const jwt = require('jsonwebtoken');

class PostsController {
    // [GET] /posts/create
    create(req, res, next) {
        var userCookie = req.signedCookies.userCookie;
        var userId = jwt.verify(userCookie, process.env.JWT_KEY);
        res.render('posts/create', { authorId: userId._id });
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

    // [GET] /posts/edit
    list(req, res, next) {
        Promise.all([Post.find({}), Post.countDocumentsDeleted()])
            .then(([posts, deletedCount]) => {
                res.render('posts/list', {
                    posts: multipleMongooseToObject(posts),
                    deletedCount,
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

    // [DELETE] /posts/:id
    destroy(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /posts/edit
    trash(req, res, next) {
        Post.findDeleted({})
            .then((posts) => {
                res.render('posts/trash', {
                    posts: multipleMongooseToObject(posts),
                });
            })
            .catch(next);
    }

    // [DELETE] /posts/:id/force
    forceDestroy(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /posts/:id/restore
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /posts/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Post.delete({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Post.restore({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force-delete':
                Post.deleteMany({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.redirect('back');
        }
    }
}

module.exports = new PostsController();
