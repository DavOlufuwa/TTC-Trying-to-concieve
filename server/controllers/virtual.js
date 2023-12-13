const { generateZoomToken } = require("../utils/middleware");

const videoRouter = require("express").Router();


videoRouter.post("/", generateZoomToken, (request, response) => {
  response.status(200).json({
    signature: response.signature
  })
})


module.exports = videoRouter
