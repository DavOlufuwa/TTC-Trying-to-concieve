const webhookRouter = require('express').Router();
const crypto = require('crypto');
const secret = process.env.PAYSTACK_SECRET_KEY;

webhookRouter.post('/', (request, response) => {
  
  const hash = crypto
    .createHmac('sha512', secret)
    .update(JSON.stringify(request.body))
    .digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    const event = request.body;

    switch (event.event) {
      case 'subscription.create':
        break;
    
      default:
        break;
    }

  }


  response.status(200).send('OK');
})


module.exports = webhookRouter