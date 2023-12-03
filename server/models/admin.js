const mongoose = require("mongoose");
const roleList = require("../utils/rolesList");
const { Schema, model } = mongoose;

const adminSchema = new Schema({
  fullName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  role: {
    type: Number,
    default: roleList.Admin
  }
})

const Admin = model("Admin" , adminSchema);

module.exports = Admin