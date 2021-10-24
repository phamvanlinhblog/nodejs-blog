const User = require('../models/user');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class UsersController {
    // [GET] /users
    index(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('users/user', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(next);
    }

    // [GET] /users/create
    create(req, res, next) {
        res.render('users/create');
    }

    // [POST] /users/store
    store(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/'))
            .catch((error) =>
                res.render('users/create', { err: error._message }),
            );
    }
}

module.exports = new UsersController();
