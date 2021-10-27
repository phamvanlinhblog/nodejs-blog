// Import mongoose : mongoose
const mongoose = require('mongoose');

async function connect() {
    try {
        // connect database
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail:' + error);
    }
}

// Export object connect
module.exports = { connect };
