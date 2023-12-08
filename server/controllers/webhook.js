const webhookRouter = require("express").Router();
const crypto = require("crypto");
const secret = process.env.PAYSTACK_SECRET_KEY;
const Subscription = require("../models/subscription");
const User = require("../models/user");

webhookRouter.post("/", async (request, response) => {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(request.body))
    .digest("hex");

  if (hash === request.headers["x-paystack-signature"]) {
    const event = request.body;

    switch (event.event) {
      case "subscription.create":
        const subscribedUser = await User.findOne({
          email: event.data.customer.email,
        });

        const subscription = new Subscription({
          subscriberId: subscribedUser.id,
          planName: event.data.plan.name,
          planCode: event.data.plan.plan_code,
          subscriptionCode: event.data.subscription_code,
          subscriptionAmount: event.data.amount / 100,
          subscriptionStatus: "active",
          customerCode: event.data.customer.customer_code,
          customerEmail: event.data.customer.email,
          accountName: event.data.authorization.account_name,
          createdAt: event.created_at,
        });

        await subscription.save();


    }
  }
  response.status(200).send("OK");

});

module.exports = webhookRouter;
