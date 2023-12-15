import express from "express";
import cors from "cors";
import db from "./configs/Database.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ModelCake from "./models/ModelCake.js";
import RouteCake from "./routers/RouteCake.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  await db.authenticate();
  console.log("Database connected....");
  await ModelCake.sync();
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(cors());

app.use("/public/images", express.static(path.join(__dirname, "public/images")));

app.use("/cake", RouteCake);

app.listen(5001, () => console.log("Server up running at port 5001...."));
