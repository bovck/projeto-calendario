import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  remedios: [
    {
      type: Schema.Types.ObjectId,
      ref: "Remedio",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
