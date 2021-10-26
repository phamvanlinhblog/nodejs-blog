const User = require('../models/user');

module.exports = function AuthMiddleware(req, res, next) {
    var userId = req.signedCookies.userId;
    console.log(userId);
    if (!userId) {
        res.redirect('/auth/login');
        return;
    }

    User.findOne({ _id: userId }, function (err, user) {
        if (!user) {
            res.redirect('/auth/login');
            return;
        } else {
            res.locals.name = user.name;
        }
    });
    next();
};