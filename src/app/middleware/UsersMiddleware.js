const User = require('../models/user');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

module.exports = function UserMiddleware(req, res, next) {
    User.find({ username: req.body.username }, function (err, user) {
        res.locals.alert = {
            notification: '',
            type: '',
        };

        if (user.length > 0) {
            res.locals.alert.notification = 'Tên tài khoản đã được sử dụng';
            res.locals.alert.type = 'danger';
        } else {
            res.locals.alert.notification = 'Đăng kí thành công';
            res.locals.alert.type = 'primary';
        }
        next();
    });
};
