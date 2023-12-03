const mongoose = require("mongoose");
const roleList = require("../utils/rolesList");
const { Schema , model } = mongoose;


const superAdminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: roleList.SuperAdmin,
  },
  refreshToken: {
    type: String,
  },
});

superAdminSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
})

const SuperAdmin = model("SuperAdmin" , superAdminSchema);

module.exports = SuperAdmin
