const express = require("express")
const router = express.Router();
const {
    getDishes,
    getDish, 
    createDish, 
    updateDish, 
    deleteDish,
    rateDish
} = require("../controller/dishController");
const tokenValidation = require("../midleware/validateToken");
const rateLimit = require("express-rate-limit");

router.use(
    rateLimit({
      windowMs: 1 * 60 * 60 * 1000,
      max: 50,
      message: "You exceeded 50 requests in 1 hour limit!",
      headers: true,
    })
  );

router.use(tokenValidation)

router.route("/").get(getDishes).post(createDish);

router.route("/:id").get(getDish).put(updateDish).delete(deleteDish);

router.post("/rating", rateDish)

module.exports = router

