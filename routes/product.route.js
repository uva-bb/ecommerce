module.exports = app => {
    const products = require("../controller/product.controller.js");

    // Access REST api methods (GET, POST, PUT, DELETE)
    var router = require('express').Router();

    // get all products
    router.get("/", products.showAll);

    // create product
    router.post("/create", products.create);

    // update product
    router.put("/updateproduct/:id", products.updateProduct);

    // If multiple parameter needed to be passed
    // router.put("/updateproduct/:id/:model", products.updateProduct);

    // delete product
    router.delete("/deleteproduct/:id", products.deleteProduct);

    // delete all product
    router.delete("/deleteall", products.deleteAll);


    app.use("/api/products", router);
}