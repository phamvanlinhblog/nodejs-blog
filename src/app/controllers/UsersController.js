const md5 = require('md5');

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
        var data = req.body;
        data.password = md5(data.password);
        const user = new User(data);
        user.role = 'user';
        if (res.locals.alert.type == 'primary') {
            user.save()
                .then(() =>
                    res.render('users/create', {
                        alert: res.locals.alert,
                    }),
                )
                .catch((error) =>
                    res.render('users/create', {
                        err: error._message,
                        data: req.body,
                    }),
                );
        } else {
            res.render('users/create', {
                data: req.body,
                alert: res.locals.alert,
            });
        }
    }

    // [GET] /users/me
    me(req, res, next) {
        res.render('users/me', {
            user: mongooseToObject(res.locals.user),
            name: res.locals.user.name,
        });
    }
}

module.exports = new UsersController();
