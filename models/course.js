const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    level: {
      type: String,
      require: true
    },
    category: [
      {
        type: String,
        required: true
      }
    ],
    amount: {
      type: Number,
      required: true
    }
  },
  {
    collection: "courses",
    timestamps: true
  }
);

module.exports = mongoose.model("user", courseSchema);
