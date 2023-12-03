const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const loginRouter = require("express").Router();

loginRouter.post("/user", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  const correctPassword = await bcryptjs.compare(password, user.passwordHash);

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
    process.env.SECRET_TOKEN_KEY
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
      secure: true,
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

module.exports = loginRouter;