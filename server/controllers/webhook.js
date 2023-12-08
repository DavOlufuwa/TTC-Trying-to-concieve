const webhookRouter = require("express").Router();
const crypto = require("crypto");
const secret = process.env.PAYSTACK_SECRET_KEY;
const Subscription = require("../models/subscription");
const User = require("../models/user");
const mongoose = require("mongoose");

webhookRouter.post("/", async (request, response) => {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(request.body))
    .digest("hex");

  if (hash === request.headers["x-paystack-signature"]) {
    const event = request.body;

    const subscribedUser = await User.findOne({
      email: event.data.customer.email,
    });

    const session = await mongoose.startSession();

    switch (event.event) {
      // First subscription
      case "subscription.create":
        session.startTransaction();

        if (!subscribedUser) {
          break;
        }
        const newSubscription = new Subscription({
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

        await User.findByIdAndUpdate(
          subscribedUser.id,
          { $set: { verified: true } },
          { new: true, session: session }
        );

        await newSubscription.save({ session: session });

        await session.commitTransaction();

        session.endSession();

        break;

      // consecutive successful renewals
      case "invoice.update":
        if (!subscribedUser) {
          break;
        }

        session.startTransaction();

        const renewedSubscription = new Subscription({
          subscriberId: subscribedUser.id,
          planName: event.data.plan.name,
          planCode: event.data.plan.plan_code,
          subscriptionCode: event.data.subscription_code,
          subscriptionAmount: event.data.amount / 100,
          subscriptionStatus: "renewed",
          customerCode: event.data.customer.customer_code,
          customerEmail: event.data.customer.email,
          accountName: event.data.authorization.account_name,
          createdAt: event.created_at,
        });

        await renewedSubscription.save({ session: session });

        await session.commitTransaction();

        session.endSession();

        break;

      // renewal unsuccessful
      case "invoice.payment_failed":
        if (!subscribedUser) {
          break;
        }

        session.startTransaction();

        const failedSubscription = new Subscription({
          subscriberId: subscribedUser.id,
          planName: event.data.plan.name,
          planCode: event.data.plan.plan_code,
          subscriptionCode: event.data.subscription_code,
          subscriptionAmount: event.data.amount / 100,
          subscriptionStatus: "not-renewed",
          customerCode: event.data.customer.customer_code,
          customerEmail: event.data.customer.email,
          accountName: event.data.authorization.account_name,
          createdAt: event.created_at,
        });

        await User.findByIdAndUpdate(
          subscribedUser.id,
          { $set: { verified: false } },
          { new: true, session: session }
        );

        await failedSubscription.save({ session: session });

        await session.commitTransaction();

        session.endSession();

        break;

      // subscription cancelled
      case "subscription.not_renew":
        if (!subscribedUser) {
          break;
        }

        session.startTransaction();

        const cancelledSubscription = new Subscription({
          subscriberId: subscribedUser.id,
          planName: event.data.plan.name,
          planCode: event.data.plan.plan_code,
          subscriptionCode: event.data.subscription_code,
          subscriptionAmount: event.data.amount / 100,
          subscriptionStatus: "cancelled",
          customerCode: event.data.customer.customer_code,
          customerEmail: event.data.customer.email,
          accountName: event.data.authorization.account_name,
          createdAt: event.created_at,
        });

        await cancelledSubscription.save({ session: session });

        await session.commitTransaction();

        session.endSession();

        break;

      // completed subscription
      case "subscription.disable":
        if (!subscribedUser) {
          break;
        }

        const completedSubscription = new Subscription({
          subscriberId: subscribedUser.id,
          planName: event.data.plan.name,
          planCode: event.data.plan.plan_code,
          subscriptionCode: event.data.subscription_code,
          subscriptionAmount: event.data.amount / 100,
          subscriptionStatus: "cancelled",
          customerCode: event.data.customer.customer_code,
          customerEmail: event.data.customer.email,
          accountName: event.data.authorization.account_name,
          createdAt: event.created_at,
        });

        await completedSubscription.save();

        break;
    }
  }
  response.status(200).send("OK");
});

module.exports = webhookRouter;
