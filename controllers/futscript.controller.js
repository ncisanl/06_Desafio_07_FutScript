import "dotenv/config";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import { futScriptModel } from "../models/futscript.model.js";

const postRegisterController = async (req, res) => {
  const { username, password } = req.body;

  try {
    await futScriptModel.registerUser({
      username,
      password: bcript.hashSync(password, 10),
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const postLoginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await futScriptModel.verifyUsername(username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcript.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      username,
      user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: "User logged successfully", token, username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const obtenerEquipos = async (req, res) => {
  try {
    const equipos = await futScriptModel.getTeams();
    return res.status(200).json(equipos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const agregarEquipo = async (req, res) => {
  const { equipo } = req.body;
  try {
    await futScriptModel.addTeam(equipo);

    return res.status(201).json({ message: "Equipo agregado con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugadores = await futScriptModel.getPlayers(teamID);
    return res.status(200).json(jugadores);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const registrarJugador = async (req, res) => {
  const { teamID } = req.params;
  const jugador = req.body;
  try {
    await futScriptModel.addPlayer({ jugador, teamID });
    return res.status(201).json({ message: "Jugador agregado con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const futScriptController = {
  postRegisterController,
  postLoginController,
  obtenerEquipos,
  agregarEquipo,
  obtenerJugadores,
  registrarJugador,
};
