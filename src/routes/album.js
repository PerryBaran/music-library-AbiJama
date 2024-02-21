const express = require("express");
const albumController = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.post("/:artists/:id/albums", albumController.createAlbum);
albumRouter.get("/albums", albumController.readAlbums);
albumRouter.get("/albums/:id", albumController.getAlbumById);
albumRouter.put("/albums/:id", albumController.updateAlbum);
albumRouter.delete("/albums/:id", albumController.deleteAlbum);
module.exports = albumRouter;
