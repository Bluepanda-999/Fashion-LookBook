// routes/externalRoutes.js
const express = require("express");
const router = express.Router();

const { getUnsplashPhotos } = require("../controllers/externalController");

// Public: no token required
router.get("/unsplash", getUnsplashPhotos);

module.exports = router;
