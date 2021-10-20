// Import models Post
const Post = require('../models/post');
class SiteController {
    // [GET] /
    home(req, res) {
        Post.find({}, (err, post) => {
            if (!err) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'ERROR!!!' });
            }
        });
    }

    // [POST] /
    post(req, res) {
        console.log(req.body);
        res.send('Done!');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
