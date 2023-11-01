module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            cartId: String,
            productId: String,
            quantity: Number,
            totalPrice: Number
        }
    );

    // specifically for mongoDB
    // every collection in mongoDB - by default it will generate primary key as _id
    // we are changing _id to id - (object.id = _id;)
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.cartId = _id;
        return object;
    })

    // we need to change below line for different Database's
    const Cart = mongoose.model("cart", schema);
    return Cart;
}