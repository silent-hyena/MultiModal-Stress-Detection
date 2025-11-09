import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
// app.use(cors());

// Routes import
import authRoutes from "./routes/authRoutes.js";
import stressRoutes from "./routes/stressRoutes.js";

// Configure CORS for your frontend (5173)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



// Routes
app.use((req,res,next)=>{
  console.log(req.url)
  // console.log(req.path)
  next();
  
})
app.use("/auth", authRoutes);
app.use("/stress", stressRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message,
    path: req.path
  });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected successfully!");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` CORS configured for frontend: http://localhost:5173`);
    });
  })
  .catch((error) => {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  });
