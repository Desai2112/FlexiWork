import express, { Request, Response } from "express";
import { connectDB } from "./DB/connectDb";
import session from "express-session";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "./index.d.ts";

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

//Routes import
import userRoutes from "./Routes/userRoutes.Route";
import clientRoutes from "./Routes/clientRoutes.Route";
import freelancerRoutes from "./Routes/freelancerRoutes.Route";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

//Routes declaration
app.use("/user", userRoutes);
app.use("/client", clientRoutes);
app.use("/freelancer", freelancerRoutes);
