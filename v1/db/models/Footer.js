const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    urls: {
      instagram: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

class Footers extends mongoose.Model {}

schema.loadClass(Footers);

module.exports = mongoose.model("footers", schema);
