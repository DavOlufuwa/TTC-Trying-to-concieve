const User = require("../models/user");
const userRouter = require("express").Router();



// Get all Users 
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
})

// Sign up User 
userRouter.post("/", async (request, response) => {
  const user = new User(request.body);
  
  const savedUser = await user.save();

  response.status(201).json(savedUser);
})



module.exports = userRouter