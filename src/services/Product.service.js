import ProductModel from "../models/product.model.js";

export default class ProductService {
    async getProductById(id) {
        return await ProductModel.findById(id).lean();
    }

    async updateProduct(id, updateData) {
        return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}