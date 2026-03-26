import express from "express";
import admin from "./config/firebase.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Firebase connected successfully");
});

// Mounted Stripe Routes
app.use("/api/stripe", stripeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
