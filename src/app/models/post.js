// Import mongoose, schema interface
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

// Model BlogPost are defined through the Schema interface.
const BlogPost = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        thumbnail: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Export model BlogPost from localhost:27017/vanlinh_blog_dev.posts
module.exports = mongoose.model('posts', BlogPost);
