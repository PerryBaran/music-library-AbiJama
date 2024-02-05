const db = require("../db/index");

const createAlbum = async (req, res) => {
  const { id: artistId } = req.params;
  const { name, year } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query(
      `INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *`,
      [name, year, artistId]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbums = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM Albums");
    const albums = response.rows;
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query(`SELECT * FROM Albums WHERE id = ${id}`);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;

  try {
    const {
      rows: [updatedAlbum],
    } = await db.query(
      "UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *",
      [name, year, id]
    );

    if (!updatedAlbum) {
      res.status(404).json({ message: `Album ${id} does not exist` });
    } else {
      res.status(200).json(updatedAlbum);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createAlbum, readAlbums, getAlbumById, updateAlbum };
