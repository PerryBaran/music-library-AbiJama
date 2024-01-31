const express = require("express");

const artistController = require("../controllers/artist");
const albumController = require("../controllers/album");

const artistRouter = express.Router();

artistRouter.post("/", artistController.createArtist);
artistRouter.get("/", artistController.readArtist);
artistRouter.get("/:id", artistController.getArtistbyId);
artistRouter.put("/:id", artistController.updateArtist);
artistRouter.patch("/:id", artistController.updateArtist);
artistRouter.delete("/:id", artistController.deleteArtist);

artistRouter.post("/artists/:id/albums", albumController.createAlbum);

module.exports = artistRouter;
