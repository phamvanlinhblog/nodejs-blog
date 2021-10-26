const newsRoute = require('./news');
const postsRoute = require('./posts');
const siteRoute = require('./site');
const usersRoute = require('./users');
const authRoute = require('./auth');

const authMiddleware = require('../app/middleware/AuthMiddleware');

function router(app) {
    app.use('/news', authMiddleware, newsRoute);
    app.use('/posts', authMiddleware, postsRoute);
    app.use('/users', usersRoute);
    app.use('/auth', authRoute);
    app.use('', authMiddleware, siteRoute);
}

module.exports = router;
