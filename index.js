import cors from "cors";
import "dotenv/config";
import express from "express";
import futScriptRoute from "./routes/futscript.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/fut-script", futScriptRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Servidor levantado con éxito! --> http://localhost:" + PORT),
);
