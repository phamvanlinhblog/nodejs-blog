// Import mongoose, schema interface
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model BlogPost are defined through the Schema interface.
const BlogPost = new Schema({
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    thumbnail: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export model BlogPost from localhost:27017/vanlinh_blog_dev.posts
module.exports = mongoose.model('posts', BlogPost);
