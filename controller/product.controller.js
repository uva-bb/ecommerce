const db = require("../model");

// Products here is a collection - similar to class
const Products = db.products;


exports.showAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}}

    Products.find({})
        .then(data => {
            debugger;
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products"
            })
        })
}

exports.create = (req, res) => {
    // validate request
    if (!req.body.title){
        res.status(400).send({message: "Title cannot be empty"});
        return;
    }

    // create a Product
    const createProduct = new Products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        model: req.body.model
    })

    // save product in the database
    createProduct
      .save(createProduct)
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
            message: 
              err.message || "Some error occurred while creatin the product"
        })
      })
}

// Update a Products by the id in the request
exports.updateProduct = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    debugger;
    const id = req.params.id;
  
    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Products with id=${id}. Maybe Products was not found!`
          });
        } else res.send({ message: "Products was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Products with id=" + id
        });
      });
  };

// Delete a Products with the specified id in the request
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
  
    Products.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Products with id=${id}. Maybe Products was not found!`
          });
        } else {
          res.send({
            message: "Products was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Products with id=" + id
        });
      });
  };


// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Products.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Products were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Products."
        });
      });
  };