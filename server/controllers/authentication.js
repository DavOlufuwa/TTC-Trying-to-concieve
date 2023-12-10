const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Admin = require("../models/admin");
const SuperAdmin = require("../models/superAdmin");

loginRouter.post("/users", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  const correctPassword = user === null ? false : await bcryptjs.compare(password, user.password);

  if (!user) {
    return response.status(401).json({ error: "invalid email" });
  }

  if (!correctPassword) {
    return response.status(401).json({ error: "invalid password" });
  }

  const userDetailsForToken = {
    email: user.email,
    id: user.id,
    fullName: user.fullName,
    role: user.role,
  };

  const accessToken = jwt.sign(
    userDetailsForToken,
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: 60 * 60,
    }
  );

  const refreshToken = jwt.sign(
    userDetailsForToken,
    process.env.SECRET_REFRESH_KEY
  );

  user.refreshToken = refreshToken;

  await user.save();

  response
    .status(200)
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      accessToken: accessToken,
    });
});

loginRouter.post("/admin", async (request, response) => {
  const { email, password } = request.body;

  const admin = await Admin.findOne({ email });

  const correctPassword = admin === null ? false : await bcryptjs.compare(password, admin.password);

  if (!admin) {
    return response.status(401).json({ error: "invalid email" });
  }

  if (!correctPassword) {
    return response.status(401).json({ error: "invalid password" });
  }

  const adminDetailsForToken = {
    email: admin.email,
    id: admin.id,
    fullName: admin.fullName,
    role: admin.role,
  };

  const accessToken = jwt.sign(
    adminDetailsForToken,
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: 60 * 60
    }
  );

  const refreshToken = jwt.sign(
    adminDetailsForToken,
    process.env.SECRET_REFRESH_KEY
  );

  admin.refreshToken = refreshToken;

  await admin.save();

  response
    .status(200)
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role,
      accessToken: accessToken,
    });
});
loginRouter.post("/doctors", async (request, response) => {
  const { userName, password } = request.body;

  const doctor = await Doctor.findOne({ userName });

  const correctPassword = doctor === null ? false : await bcryptjs.compare(password, doctor.password);

  if (!doctor) {
    return response.status(401).json({ error: "invalid email" });
  }

  if (!correctPassword) {
    return response.status(401).json({ error: "invalid password" });
  }

  const doctorDetailsForToken = {
    email: doctor.email,
    id: doctor.id,
    userName: doctor.userName,
    fullName: doctor.fullName,
    role: doctor.role,
  };

  const accessToken = jwt.sign(
    doctorDetailsForToken,
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: 60 * 60
    }
  );

  const refreshToken = jwt.sign(
    doctorDetailsForToken,
    process.env.SECRET_REFRESH_KEY
  );

  doctor.refreshToken = refreshToken;

  await doctor.save();

  response
    .status(200)
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({
      id: doctor.id,
      email: doctor.email,
      fullName: doctor.fullName,
      role: doctor.role,
      accessToken: accessToken,
    });
});

loginRouter.post("/superadmin", async (request, response) => {
  const { email, password } = request.body;

  const superAdmin = await SuperAdmin.findOne({ email });

  const correctPassword = await bcryptjs.compare(
    password,
    superAdmin.password
  );

  if (!superAdmin) {
    return response.status(401).json({ error: "invalid email" });
  }

  if (!correctPassword) {
    return response.status(401).json({ error: "invalid password" });
  }

  const superAdminDetailsForToken = {
    id: superAdmin.id,
    email: superAdmin.email,
    fullName: superAdmin.fullName,
    role: superAdmin.role,
  };

  const accessToken = jwt.sign(
    superAdminDetailsForToken,
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: 60 * 60
    }
  );

  const refreshToken = jwt.sign(
    superAdminDetailsForToken,
    process.env.SECRET_REFRESH_KEY
  );

  superAdmin.refreshToken = refreshToken;

  await superAdmin.save();

  response
    .status(200)
    .cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({
      id: superAdmin.id,
      email: superAdmin.email,
      fullName: superAdmin.fullName,
      role: superAdmin.role,
      accessToken: accessToken,
    });
});

module.exports = loginRouter;
