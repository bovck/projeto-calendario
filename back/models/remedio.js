import mongoose from "mongoose";

const Schema = mongoose.Schema;

const remedioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const Remedio = mongoose.model("Remedio", remedioSchema);

export default Remedio;
