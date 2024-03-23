const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
      required: true,
    },
    click: {
      type: Number,
      trim: true,
      default: 0,
    },
    tags: [
      {
        tagName: {
          type: String,
          trim: true,
        },
      },
    ],
    mainImg: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    categoryId: {
      type: String,
      trim: true,
      required: true,
      ref: "categories",
    },
    userId: {
      type: String,
      trim: true,
      required: true,
      ref: "users",
    },
    share: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

class Posts extends mongoose.Model {}

schema.loadClass(Posts);

module.exports = mongoose.model("post", schema);
