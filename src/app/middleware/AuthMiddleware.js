const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function AuthMiddleware(req, res, next) {
    var userCookie = req.signedCookies.userCookie;
    if (!userCookie) {
        res.redirect('/auth/login');
        return;
    }

    var data = jwt.verify(userCookie, process.env.JWT_KEY);
    User.findOne({ _id: data._id }, function (err, user) {
        if (!user) {
            res.redirect('/auth/login');
            return;
        } else {
            res.locals.user = user;
        }
        next();
    });
};
