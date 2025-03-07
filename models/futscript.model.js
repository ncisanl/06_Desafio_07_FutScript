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

const getPlayers = async (equipo) => {};
const addPlayer = async ({ jugador, teamID }) => {};

export const futScriptModel = {
  registerUser,
  verifyUsername,
  getTeams,
  addTeam,
  getPlayers,
  addPlayer,
};
