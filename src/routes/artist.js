const express = require("express");

const artistController = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.post("/artists", artistController.createArtist);
artistRouter.get("/artists", artistController.readArtist);
artistRouter.get("/artists/:id", artistController.getArtistbyId);
artistRouter.put("/artists/:id", artistController.updateArtist);
artistRouter.patch("/artists/:id", artistController.updateArtist);
artistRouter.delete("/artists/:id", artistController.deleteArtist);

module.exports = artistRouter;
