const mongoose = require("mongoose")

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nama tour harus ada"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "harganya harus ada"],
  },
})

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour
