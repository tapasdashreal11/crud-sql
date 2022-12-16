import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routers/router.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();


connectDB();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/", router);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} at port ${PORT}`)
  );
  