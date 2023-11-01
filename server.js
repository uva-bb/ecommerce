const express = require("express");
const cors = require("cors");

const app = express();  // to access rest api

// For get body data from POST request
// Parse requests of content-type - application/JSON
app.use(express.json());

// connect to DB
const db = require("./model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  })


//access api url - returning JSON data
app.get("/", (req, res) => {
    res.json({message: "Welcome"})
})

// app.get("/products", (req, res) => {
//     res.json({message: "products"})
// })

// app.get("/carts", (req, res) => {
//     res.json({message: "carts"})
// })


// SET ROUTES
require("./routes/product.route.js")(app);
require("./routes/cart.route.js")(app);

// SET PORT
const port = process.env.PORT || 8083;

// LISTEN to requests
app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})