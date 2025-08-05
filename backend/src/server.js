import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// #middleware
app.use(cors());
app.use(express.json()); // acces request body

// app.use((req, res, next) => {
//   console.log(`what is body ${req.url}`);
//   next();
// });
app.use(ratelimiter);
app.use("/api/notes", notesRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
