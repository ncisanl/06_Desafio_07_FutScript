import format from "pg-format";
import { pool } from "../database/connection.js";

const registerUser = async ({ username, password }) => {
  const query =
    "INSERT INTO usuarios (username, password) VALUES (%L, %L) RETURNING *";
  const formattedQuery = format(query, username, password);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

const verifyUsername = async (username) => {
  const query = "SELECT * FROM usuarios WHERE username = %L";
  const formattedQuery = format(query, username);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

const getTeams = async () => {
  const query = "SELECT * FROM equipos";
  const formattedQuery = format(query);
  const { rows } = await pool.query(formattedQuery);
  return rows;
};

const addTeam = async (team) => {
  const query = "INSERT INTO equipos (name) VALUES (%L) RETURNING *";
  const formattedQuery = format(query, team);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

const getPlayers = async (teamID) => {
  const query =
    "SELECT j.name, p.name AS posicion FROM jugadores AS j INNER JOIN posiciones AS p ON j.position = p.id WHERE j.id_equipo = %L";
  const formattedQuery = format(query, teamID);
  const { rows } = await pool.query(formattedQuery);
  return rows;
};

const addPlayer = async ({ jugador, posicion, teamID }) => {
  const query =
    "INSERT INTO jugadores (id_equipo, name, position) VALUES (%L, %L, %L) RETURNING *";
  const formattedQuery = format(query, teamID, jugador, posicion);
  const { rows } = await pool.query(formattedQuery);
  return rows[0];
};

export const futScriptModel = {
  registerUser,
  verifyUsername,
  getTeams,
  addTeam,
  getPlayers,
  addPlayer,
};
