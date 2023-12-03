const mongoose = require("mongoose");
const roleList = require("../utils/rolesList");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  fullName: {
    type: String,
    minlength: 2,
    required: true,
  },
  age: {
    type: String,
    minlength: 2,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
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
  password: {
    type: String,
    required: true,
  },
  partnerFullName: {
    type: String,
    minlength: 2,
  },
  partnerAge: {
    type: String,
    minlength: 2,
  },
  partnerGender: {
    type: String,
  },
  partnerDateOfBirth: {
    type: Date,
  },
  partnerEmail: {
    type: String,
  },
  partnerAddress: {
    type: String,
  },
  partnerPhoneNumber: {
    type: String,
  },
  medicalHistory: {
    type: String,
  },
  role: {
    type: Number,
    default: roleList.User,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
})



const User = model("User" , userSchema);

module.exports = User