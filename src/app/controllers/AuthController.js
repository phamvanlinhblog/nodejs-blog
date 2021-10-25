const User = require('../models/user');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login');
    }

    // [POST] /auth/login
    postLogin(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ username: username })
            .then((user) => {
                if (!user) {
                    res.render('auth/login', {
                        error: {
                            message: 'Tài khoản không đúng!',
                            type: 'warning',
                        },
                    });
                    return;
                } else if (password !== user.password) {
                    res.render('auth/login', {
                        error: {
                            message: 'Mật khẩu không đúng!',
                            type: 'warning',
                        },
                        data: req.body,
                    });
                    return;
                }
                res.cookie('userId', user.id);
                res.redirect('/users');
            })
            .catch(next);
    }
}

module.exports = new AuthController();
