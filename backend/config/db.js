const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DB connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

module.exports = connectDB