const User = require("../models/user");
const userRouter = require("express").Router();



// Get all Users 
userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
})



module.exports = userRouter