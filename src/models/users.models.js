import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const userModel = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'moderator'],
  },
});

userModel.plugin(paginate);

export default model("User", userModel);
