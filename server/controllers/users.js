const User = require("../models/user");
const userRouter = require("express").Router();
const bcryptjs = require("bcryptjs");


// Get all Users 
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
})

// Sign up User 
userRouter.post("/", async (request, response) => {

  const body = request.body;
  const newUser = {}
  const fields = [
    "fullName",
    "age",
    "gender",
    "dateOfBirth",
    "country",
    "email",
    "address",
    "phoneNumber",
    "password",
    "partnerFullName",
    "partnerAge",
    "partnerGender",
    "partnerEmail",
    "partnerPhoneNumber",
    "medicalHistory",
  ]

  fields.forEach((field) => {
    if (body[field] !== "") {
      newUser[field] = body[field]
    }
  })

  const passwordHash = await bcryptjs.hash(newUser.password, 10)
  if(passwordHash) {
    newUser.password = passwordHash
  }
  
  const userToSave = new User(newUser);

  const savedUser = await userToSave.save();

  response.status(201).json(savedUser);
})

module.exports = userRouter