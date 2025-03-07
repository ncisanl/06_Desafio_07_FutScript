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

const getTeams = async () => {};
const addTeam = async (teamID) => {};
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
