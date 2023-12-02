const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5050;

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
