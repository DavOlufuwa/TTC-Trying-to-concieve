const { Schema, model } = require("mongoose");

const subscriptionSchema = new Schema({
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
  customerCode: {
    type: String,
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  accountName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "renewed","not-renewed", "failed"],
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
