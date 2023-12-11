const Admin = require("../models/admin");
const adminRouter = require("express").Router();
const bcryptjs = require("bcryptjs");



// Sign up Admin

adminRouter.post("/", async (request, response) => {
  const { email, fullName, password } = request.body;

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return response.status(409).json({ error: "Admin with this email already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const admin = new Admin({
    email,
    fullName,
    password: hashedPassword,
  });
  
  const savedAdmin = await admin.save();

  response.status(201).json(savedAdmin);
})

module.exports = adminRouter