const mongoose = require("mongoose");
const roleList = require("../utils/rolesList");
const { Schema , model } = mongoose;


const superAdminSchema = new Schema({
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
    default: roleList.SuperAdmin
  }
})

const SuperAdmin = model("SuperAdmin" , superAdminSchema);

module.exports = SuperAdmin
