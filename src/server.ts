import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user-routes";
import { connectMongo, connectElasticsearch } from "./services";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use("/api", userRouter);

async function startServer(): Promise<void> {
  await connectMongo();
  await connectElasticsearch();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

startServer().catch(console.error);
