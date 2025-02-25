import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 
import paginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const ticketModel= new Schema({
    code: {
        type: String,
        unique: true,
        default: uuidv4, 
    },
    purchase_datetime: {
        type: Date,
        default: Date.now, 
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
}, { timestamps: true });

ticketModel.plugin(paginate)

export default model("Tickets", ticketModel);
