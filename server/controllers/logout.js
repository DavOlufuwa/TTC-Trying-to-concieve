const logoutRouter = require("express").Router();
const Admin = require("../models/admin");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const SuperAdmin = require("../models/superAdmin");
const { refreshTokenExtractor } = require("../utils/middleware");

logoutRouter.get("/", refreshTokenExtractor, async (request, response) => {

  if(!request.user){
    return response.status(401).json({ error: "No user found" });
  }



  if (request.user.role === 2170) {
    const superAdmin = await SuperAdmin.findOne({ email: request.user.email });
    superAdmin.refreshToken = "";
    await superAdmin.save();
  } else if (request.user.role === 5150) {
    const admin = await Admin.findOne({ email: request.user.email });
    admin.refreshToken = "";
    await admin.save();
  } else if (request.user.role === 5015) {
    const doctor = await Doctor.findOne({ email: request.user.email });
    doctor.refreshToken = "";
    await doctor.save();
  } else {
    const user = await User.findOne({ email: request.user.email });
    user.refreshToken = "";
    await user.save();
  }

  response
    .clearCookie("jwt", {
      httpOnly: true,
      SameSite: "None",
      secure: false,
    })
    .status(204)
    .send();
});

module.exports = logoutRouter;
