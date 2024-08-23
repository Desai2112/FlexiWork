import express, { Request, Response } from "express";
import { connectDB } from "./DB/connectDb";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "./index.d.ts";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.Session_Secret || "abcdfekhb4efc5f4";
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello App is working");
  res.send("Ok");
});

connectDB();
app.listen(port, () => {
  console.log(`App is litsening on port ${port}`);
});

//session Configuration
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    name: "user",
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME,
      collectionName: "sessions",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1,
    }),
  }),
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

//Routes import
import authRoutes from "./Routes/auth.Route";
import userProfileRoutes from "./Routes/userProfile.Route";
import jobRoutes from "./Routes/job.Routes";
import bidRoRoutes from "./Routes/bid.Routes";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

//Routes declaration
app.use("/auth", authRoutes);
app.use("/user", userProfileRoutes);
app.use("/job", jobRoutes);
app.use("/bid", bidRoRoutes);
