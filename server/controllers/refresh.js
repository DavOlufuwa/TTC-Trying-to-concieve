const jwt = require("jsonwebtoken");
const refreshRouter = require("express").Router();
const { refreshTokenExtractor } = require("../utils/middleware");

refreshRouter.get("/", refreshTokenExtractor,  async (request, response) => {
  
  if (!request.user) {
    return response.status(401).json({ error: "No user found" });
  }

  const accessToken = jwt.sign({ id: request.user.id, role: request.user.role }, process.env.SECRET_TOKEN_KEY, { expiresIn: 60 * 30 });

  response.status(200).send({
    id: user.id,
    email: user.email,
    role: user.role,
    fullName: `${user.firstName} ${user.lastName}`,
    accessToken: accessToken,
  });

})

module.exports = refreshRouter