const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = function RoleMiddleware(req, res, next) {
    if (res.locals.user.role !== 'admin') {
        res.redirect('/');
        return;
    } else {
        next();
    }
};
