require('dotenv').config({ path: './src/config/.env' });
const mongoose = require("mongoose");

const connectDB = async () => {
    console.log(process.env.DB_CONNECTION);
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
};

module.exports = connectDB;