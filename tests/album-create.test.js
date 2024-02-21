const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create album", () => {
  let artist;

  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      ["Tame Impala", "rock"]
    );

    artist = rows[0];
  });

  describe("POST /artists/:id/albums", () => {
    it("creates a new album in the databse", async () => {
      console.log("Artist ID:", artist.id);
      const { status, body } = await request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: "thriller",
          year: 1982,
        });
      console.log("Response:", status, body);
      expect(status).to.equal(201);
    });
  });
});
