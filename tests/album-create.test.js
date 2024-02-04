const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("create album", () => {
  describe("/artists/:id/albums", () => {
    let artist;

    beforeEach(async () => {
      const { rows } = await db.query(
        "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
        ["Tame Impala", "rock"]
      );

      artist = rows[0];
    });

    describe("POST", () => {
      it("creates a new album in the databse", async () => {
        console.log("Artist ID:", artist.id);
        const { status, body } = await request(app)
          .post(`/artists/${artist.id}/albums`)
          .send({
            name: "Any Album",
            year: 2022,
          });
        console.log("Response:", status, body);
        expect(status).to.equal(201);
      });
    });
  });
});
