const SuperAdmin = require("../models/superAdmin");
const bcryptjs = require("bcryptjs");
const superAdminRouter = require("express").Router();



// Sign up SuperAdmin

superAdminRouter.post("/", async (request, response) => {
  const { email, fullName, password } = request.body;

  const existingSuperAdmin = await SuperAdmin.findOne({ email });

  if (existingSuperAdmin) {
    return response.status(409).json({ error: "SuperAdmin already exists" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const superAdmin = new SuperAdmin({
    email,
    fullName,
    password: hashedPassword,
  });
  
  const savedSuperAdmin = await superAdmin.save();

  response.status(201).json(savedSuperAdmin);
})

module.exports = superAdminRouter