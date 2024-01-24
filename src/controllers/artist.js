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

module.exports = { createArtist };
