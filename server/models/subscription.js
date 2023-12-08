const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
  subscriberId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  planName: {
    type: String,
  },
  planCode: {
    type: String,
  },
  subscriptionCode: {
    type: String,
  },
  subscriptionAmount: {
    type: Number,
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "cancelled", "renewed", "not-renewed", "failed"],
  },
  customerCode: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  accountName: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

subscriptionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
