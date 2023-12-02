"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5050;
app.get("/api/home", (_req, res) => {
    res.json({ message: "Hello World!, We made it bruhhh How are things Going, Fine I guess" });
});
app.use((0, cors_1.default)());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
