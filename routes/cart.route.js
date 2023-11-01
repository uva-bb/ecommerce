module.exports = app => {
    const carts = require("../controller/cart.controller.js");

    // Access REST api methods (GET, POST, PUT, DELETE)
    var router = require('express').Router();

    // get all carts
    router.get("/", carts.showAll);

    // create cart
    router.post("/createcart", carts.createCart);

    // update cart
    router.put("/updatecart/:id", carts.updateCart);

    // delete cart
    router.delete("/deletecart/:id", carts.deleteCart);

    app.use("/api/carts", router);
}