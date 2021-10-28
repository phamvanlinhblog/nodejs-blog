const md5 = require('md5');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class AuthController {
    // [GET] /auth/login
    login(req, res, next) {
        res.render('auth/login', { layout: 'auth' });
    }

    // [POST] /auth/login
    postLogin(req, res, next) {
        var username = req.body.username;
        var password = md5(req.body.password);
        if (!username) {
            res.render('auth/login', {
                error: { message: 'Bạn chưa nhập tài khoản', type: 'danger' },
            });
            return;
        }
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
                var token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
                res.cookie('userCookie', token, { signed: true });
                res.redirect('/');
            })
            .catch(next);
    }

    // [GET] /auth/logout
    logout(req, res, next) {
        res.clearCookie('userCookie');
        res.redirect('/auth/login');
    }
}

module.exports = new AuthController();
