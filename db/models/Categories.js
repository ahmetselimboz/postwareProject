const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
      },
  },
  { versionKey: false, timestamps: true }
);

class Categories extends mongoose.Model {}

schema.loadClass(Categories);

module.exports = mongoose.model("categories", schema);
