import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const productModel = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    thumbnails: { type: [String], default: [] }, 
}, { timestamps: true });

productModel.plugin(paginate)

export default model("Products", productModel);
