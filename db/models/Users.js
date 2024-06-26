const mongoose = require("mongoose");
const config = require("../../config/environments");
const convertToDataURI = require("../../lib/DefaultUserImage");
const { generateObjectUrl } = require("../../lib/Minio");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    surname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mainAdmin: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      trim: true,
      default: generateObjectUrl("Default_User"),
    },
    about: {
      type: String,
      trim: true,
      default: "A blogger",
    },
    language: { type: String, default: config.DEFAULT_LANG },
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
      linkedin: {
        type: String,
        trim: true,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

class User extends mongoose.Model {}

schema.loadClass(User);



module.exports = mongoose.model("users", schema);