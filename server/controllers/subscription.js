const Subscription = require('../models/subscription');
const subscriptionRouter = require('express').Router();


subscriptionRouter.post('/', async (request, response) => {
  const body = request.body;

  const subscription = new Subscription(body)

  await subscription.save();

  response.status(201).json(subscription);
})


subscriptionRouter.get('/', async (request, response) => {
  
  const subscriptions = await Subscription.find({}).populate('subscriberId', {
    fullName: 1,
    email: 1,
    phoneNumber: 1
  })

  response.status(200).json(subscriptions);
})


module.exports = subscriptionRouter
