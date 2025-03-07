import { futScriptController } from "../controllers/futscript.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/register", futScriptController.postRegisterController);

router.post("/login", futScriptController.postLoginController);

router.get("/equipos", futScriptController.obtenerEquipos);

router.post("/equipos", authMiddleware, futScriptController.agregarEquipo);

router.get("/equipos/:teamID/jugadores", futScriptController.obtenerJugadores);

router.post(
  "/equipos/:teamID/jugadores",
  authMiddleware,
  futScriptController.registrarJugador,
);

export default router;
