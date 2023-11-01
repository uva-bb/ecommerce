const db = require("../model");
const Carts = db.carts;
const Products = db.products;


exports.showAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}}

    Carts.find({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Carts"
            })
        })
}

exports.createCart = (req, res) => {
    // validate request
    if (!req.body.productId || !req.body.quantity){
        res.status(400).send({message: "product/quantity cannot be empty"});
        return;
    }

    // create a cart
    const createCart = new Carts({
        productId: req.body.productId,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    })

    createCart
      .save(createCart)
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while create the cart"
        })
    })
}

// Update a Products by the id in the request
exports.updateCart = async (req, res) => {
    if (!req.body.productId || !req.body.quantity) {
      return res.status(400).send({
        message: "product/quantity cannot be empty!"
      });
    }
    // get product
    const product_data = await Products.findById(req.body.productId);
    
    if (!product_data){
      res.status(404).send({message: 'Product item not found.'})
    }
    const cart_id = req.params.id;
    const cart_quantity = req.body.quantity;

    const cart_obj = await Carts.findById(cart_id);
    if (!cart_obj){
      res.status(404).send({message: 'Cart not found.'})
    }
    if (cart_obj.quantity != cart_quantity){
        cart_obj.quantity = cart_quantity;
        cart_obj.totalPrice = product_data.price * cart_quantity;
        cart_obj.save(cart_obj)
        .then(data => {
            console.log(data);
            if (!data) {
                res.status(404).send({
                message: `Cannot update Cart with id=${cart_id}. Maybe Cart was not found!`
                });
            } else res.send(cart_obj);
        })
    } else {
        res.send(cart_obj)
    }
};


// Delete cart with the specified id in the request
exports.deleteCart = (req, res) => {
    debugger;
    const id = req.params.id;
  
    Carts.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
          });
        } else {
          res.send({
            message: "Cart was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cart with id=" + id
      });
    });
}
