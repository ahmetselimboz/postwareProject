const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name:{
        type:String,
        trim:true,
        required: true
    },
    email:{
        type:String,
        trim:true,
        required: true
    },
  
    phone:{
        type:String,
        trim:true,
        required: true
    },
    subject:{
        type:String,
        trim:true,
        required: true
    },
    message:{
        type:String,
        trim:true,
        required: true
    },
  },
  { versionKey: false, timestamps: true }
);

class Contacts extends mongoose.Model {}

schema.loadClass(Contacts);

module.exports = mongoose.model("contacts", schema);
