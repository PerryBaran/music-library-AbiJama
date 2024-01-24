const db = require("../db/index");

const createArtist = async (req, res) => {
  const { name, genre } = req.body;
  console.log(req.body);
  try {
    await db.query(
      `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
      [name, genre]
    );
    console.log(name, "name");
    res.status(201).json(name);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readArtist = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM artists");
    const artists = response.rows;

    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtistbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [artist],
    } = await db.query("SELECT * FROM artists WHERE id = $1", [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
module.exports = { createArtist, readArtist, getArtistbyId };
