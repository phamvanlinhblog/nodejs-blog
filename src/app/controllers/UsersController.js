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
        if (res.locals.alert.type == 'primary') {
            user.save()
                .then(() =>
                    res.render('users/create', {
                        data: req.body,
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
}

module.exports = new UsersController();
