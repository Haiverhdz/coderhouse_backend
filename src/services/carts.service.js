import CartModel from "../models/cart.model.js";

export default class CartService {
    async getCartById(id) {
        return await CartModel.findById(id).populate("products.product").lean();
    }

    async updateCart(id, products) {
        return await CartModel.findByIdAndUpdate(id, { products }, { new: true });
    }
}