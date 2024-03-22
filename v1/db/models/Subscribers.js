const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: {
        type: String,
        trim: true,
        required: true,
      },
  },
  { versionKey: false, timestamps: true }
);

class Subscribers extends mongoose.Model {}

schema.loadClass(Subscribers);

module.exports = mongoose.model("subscribers", schema);
