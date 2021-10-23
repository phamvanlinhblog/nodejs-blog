// Import mongoose, schema interface
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

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

// Add plugin
mongoose.plugin(slug);
BlogPost.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// Export model BlogPost from localhost:27017/vanlinh_blog_dev.posts
module.exports = mongoose.model('posts', BlogPost);
