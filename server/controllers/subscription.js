const Subscription = require('../models/subscription');
const subscriptionRouter = require('express').Router();


subscriptionRouter.post('/', async (request, response) => {
  const body = request.body;

  const subscription = new Subscription(body)

  await subscription.save();

  response.status(201).json(subscription);
})


module.exports = subscriptionRouter
