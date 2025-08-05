import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ___dirname = path.resolve();
// #middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
app.use(express.json()); // acces request body

// app.use((req, res, next) => {
//   console.log(`what is body ${req.url}`);
//   next();
// });
app.use(ratelimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(___dirname, "../frontend", "dist", "index.html"));
  });
}

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
  });
});
