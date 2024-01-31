const express = require("express");
const albumController = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.post("/", albumController.createAlbum);

module.exports = albumRouter;
