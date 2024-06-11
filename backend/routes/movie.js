const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

router.get("/movies/trending", movieController.getTrending);
router.get("/movies/top-rate", movieController.getTopRate);
router.get("/movies/discover/:genreId", movieController.getDiscovery);
router.get("/movies/original", movieController.getOriginal);
router.get("/movies/video/:videoId", movieController.getTrailer);
router.get("/movies/search", movieController.getSearch);

module.exports = router;
