const newsRoute = require('./news');
const postsRoute = require('./posts');
const siteRoute = require('./site');

function router(app) {
    app.use('/news', newsRoute);
    app.use('/posts', postsRoute);
    app.use('', siteRoute);
}

module.exports = router;
