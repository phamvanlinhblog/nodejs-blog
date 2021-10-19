const newsRoute = require('./news')
const siteRoute = require('./site')

function router(app) {
      
    app.use('/news', newsRoute)
    app.use('', siteRoute)
    
}

module.exports = router
