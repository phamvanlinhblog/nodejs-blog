const newsRoute = require('./news');
const postsRoute = require('./posts');
const siteRoute = require('./site');
const usersRoute = require('./users');

function router(app) {
    app.use('/news', newsRoute);
    app.use('/posts', postsRoute);
    app.use('/users', usersRoute);
    app.use('', siteRoute);
}

module.exports = router;
