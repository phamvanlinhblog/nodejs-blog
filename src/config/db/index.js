// Import mongoose : mongoose
const mongoose = require('mongoose');

async function connect() {
    try {
        // connect database
        await mongoose.connect('mongodb://localhost:27017/vanlinh_blog_dev');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail:' + error);
    }
}

// Export object connect
module.exports = { connect };
