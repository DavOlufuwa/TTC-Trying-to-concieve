const { Schema, model } = require("mongoose");



const subscriptionSchema = new Schema({
  planName: {
    type: String,
    required: true
  },
  planCode: {
    type: String,
    required: true
  },
  subscriptionCode: {
    type: String,
    required: true
  },
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  accountName: {
    type: String,
    required: true
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
  }
})

subscriptionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});



const Subscription = model("Subscription", subscriptionSchema);