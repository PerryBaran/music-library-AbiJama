const express = require("express");
const artistController = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/", artistController.createArtist);
artistRouter.get("/", artistController.readArtist);
artistRouter.get("/:id", artistController.getArtistbyId);
artistRouter.put("/:id", artistController.updateArtist);
artistRouter.patch("/:id", artistController.updateArtist);
module.exports = artistRouter;
