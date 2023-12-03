const mongoose = require("mongoose");
const roleList = require("../utils/rolesList");
const { Schema, model } = mongoose;

const doctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    minlength: 6,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  specialization: {
    type: String,
  },
  medicalLicenseNumber: {
    type: String,
  },
  secretQuestion: {
    type: String,
  },
  secretAnswer: {
    type: String,
  },
  refreshToken: {
    type: String,
  }
});

doctorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
})


const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;