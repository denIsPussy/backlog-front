export default class CartItemDTO {
    constructor(id, product, shoppingCart, quantity) {
        this.id = id;
        this.product = product;
        this.shoppingCart = shoppingCart;
        this.quantity = quantity;
    }
}
