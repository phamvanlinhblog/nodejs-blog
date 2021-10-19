class SiteController {
    
    // [GET] /
    home(req, res) {
        res.render('home')
    }

    // [POST] /
    post(req, res) {
        console.log(req.body)
        res.send('Done!')
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }

}

module.exports = new SiteController
