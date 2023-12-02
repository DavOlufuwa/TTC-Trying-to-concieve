import express from "express";
import cors from "cors";
const app = express();
const PORT = 5050;

app.get("/api/home", (_req, res) => {
  res.json({ message: "Hello World!, We made it bruhhh How are things Going, Fine I guess" });
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
