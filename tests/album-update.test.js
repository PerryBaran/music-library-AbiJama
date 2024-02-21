const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Update Album", () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows } = await db.query(
      "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *",
      ["", ""]
    );

    artist = rows[0];

    const albumData = await db.query(
      "INSERT INTO Albums (name, year, artistid) VALUES ($1, $2, $3) RETURNING *",
      ["thriller", "1982", artist.id]
    );

    album = albumData.rows[0];
  });

  describe("PUT /albums/{id}", () => {
    it("replaces the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({ name: "thriller", year: "1982" });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "thriller",
        year: "1982",
        artistid: artist.id,
      });
    });
  });
  it("returns a 404 if the album does not exist", async () => {
    const { status, body } = await request(app).get("/albums/555").send();

    expect(status).to.equal(404);
    expect(body.message).to.equal("album 555 does not exist");
  });
});
