const mongoose = require('mongoose');
const MONGO = process.env.MONGO_URL;
mongoose.connect(MONGO)

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open", function () {
    console.log("connected sucessfully")
})




