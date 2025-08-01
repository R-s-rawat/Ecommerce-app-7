// // below is commonJS way (for import export, change way in package.json)
// const express = require('express');
// const colors = require('colors');

// // below is module way (for import export (its newer way es6(ecmaSCRIPT 2015- i.e._es-v.6)))
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"; // // in type:module (es6) for import-export(within app), 
import cors from "cors";
// file extensions are compulsory
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

// configure env - (as our env file is in root, so no location defining inside config method(i.e. not defining any object in config() as .env is already in root path))
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middlewares
// app.use(cors())

// ✅ for cors: Allow Both Dev & Prod Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommerce-app-7.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, //Only useful, when ✅ Only if using cookies/auth are needed
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));
// ✅ cors - Setup

// 👇 Handle preflight OPTIONS requests globally
// app.options("*", cors());  // ✅ cors - preflight but may override earlier settings so, comment it

app.use(express.json()); // // in request & response, json data transfer (by default feature in express)
app.use(morgan("dev")); // // for knowing which api getting called/requested (just for local testing) - *Not for prod. (nodeJS -runtime within local setup along Express backend framework)

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

// rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to ecommerce app</h1>");
});

// port
// nodeJS uses process.env
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
