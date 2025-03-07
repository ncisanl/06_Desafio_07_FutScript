import request from "supertest";
import { app } from "../index.js";

describe("GET - /equipos", () => {
  it("status code 200 y un array como respuesta", async () => {
    const response = await request(app).get("/fut-script/equipos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST - /login", () => {
  it("status code 200 y un object al enviar credenciales correctas", async () => {
    const bodyTest = { username: "admin", password: "1234" };
    const response = await request(app)
      .post("/fut-script/login")
      .send(bodyTest);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
  });

  it("status code 400 al enviar credenciales incorrectas", async () => {
    const bodyTest = { username: "nico", password: "12345" };
    const response = await request(app)
      .post("/fut-script/login")
      .send(bodyTest);
    expect(response.statusCode).toBe(400);
  });
});

describe("POST - /equipos/:teamID/jugadores", () => {
  let token = "";

  it("Obtencion de token para test que agrega un jugador", async () => {
    const response = await request(app)
      .post("/fut-script/login")
      .send({ username: "admin", password: "1234" });
    token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("status code 201 al enviar token y datos validos", async () => {
    const bodyTest = { jugador: "Sergio Ramos", posicion: "3" };
    const response = await request(app)
      .post("/fut-script/equipos/2/jugadores")
      .set("Authorization", `Bearer ${token}`)
      .send(bodyTest);
    expect(response.statusCode).toBe(201);
  });
});
