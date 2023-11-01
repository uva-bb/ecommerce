const dbConfig = require("../config/db.config.js")

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // enable promise object db and node

// database connection properties to establish
const db = {};     
db.mongoose = mongoose;
db.url = dbConfig.url;

db.products = require("./product.model.js")(mongoose);
db.carts = require("./cart.model.js")(mongoose);
// db.payments = require("./payment.model.js")(mongoose);


// we are exporting module
module.exports = db;