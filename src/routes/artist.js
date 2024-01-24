const express = require("express");
const artistController = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/", artistController.createArtist);
artistRouter.get("/", artistController.readArtist);
artistRouter.get("/:id", artistController.getArtistbyId);

module.exports = artistRouter;
