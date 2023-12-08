const User = require("../models/user");
const userRouter = require("express").Router();
const bcryptjs = require("bcryptjs");
const {
  doctorExtractor,
  adminExtractor,
  userExtractor,
} = require("../utils/middleware");

// Sign up User
userRouter.post("/", async (request, response) => {
  const body = request.body;
  const newUser = {};
  const fields = [
    "fullName",
    "age",
    "gender",
    "dateOfBirth",
    "country",
    "email",
    "address",
    "phoneNumber",
    "password",
    "partnerFullName",
    "partnerAge",
    "partnerGender",
    "partnerEmail",
    "partnerPhoneNumber",
    "medicalHistory",
  ];

  fields.forEach((field) => {
    if (body[field] !== "") {
      newUser[field] = body[field];
    }
  });

  const passwordHash = await bcryptjs.hash(newUser.password, 10);
  if (passwordHash) {
    newUser.password = passwordHash;
  }

  const userToSave = new User(newUser);

  const savedUser = await userToSave.save();

  response.status(201).json(savedUser);
});

// Get All Users
userRouter.get("/", adminExtractor,
  async (request, response) => {
    const authorizedUser = request.user;
  
    if (!authorizedUser && ((authorizedUser.role !== 2170) || (authorizedUser.role !== 5150))) {
      return response.status(401).json({ error: "unauthorized action" });
    }

    const users = await User.find({}).sort({id: -1}).exec();

    response.status(200).json(users);
  }
);

// Get User By Id
userRouter.get("/:id", async (request, response) => {
  const authorizedUser = request.user;

  if (!authorizedUser) {
    return response.status(401).json({ error: "unauthorized action" });
  }

  response.status(200).json(authorizedUser);
});

// Verify User
userRouter.put(
  "/:id",
  adminExtractor,
  async (request, response) => {
    const userId = request.params.id;

    if (authorizedUser?.role !== 2170 || authorizedUser?.role !== 5150) {
      return response.status(401).json({ error: "unauthorized action" });
    }

    const verifiedUser = await User.findByIdAndUpdate(userId, {
      verified: true,
    });

    response.status(200).json(verifiedUser);
  }
);

// Delete User
userRouter.delete(
  "/:id",
  adminExtractor,
  async (request, response) => {
    const id = request.params.id;

    const authorizedUser = request.user;

    if (authorizedUser?.role !== 2170 || authorizedUser?.role !== 5150) {
      return response.status(401).json({ error: "unauthorized action" });
    }

    await User.findByIdAndDelete(id);

    response.status(204).end();
  }
);

module.exports = userRouter;
