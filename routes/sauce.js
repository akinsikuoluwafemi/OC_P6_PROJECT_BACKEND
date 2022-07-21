const express = require("express");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, sauceCtrl.likeASauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.modifyOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;
