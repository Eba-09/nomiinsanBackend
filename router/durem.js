const express = require("express")
const {getDurems,getDurem,createDurem,deleteDurem, updateDurem} = require("../controller/durem");
const router = express.Router();
router.route("/").get(getDurems).post(createDurem);
router.route("/:id").get(getDurem).put(updateDurem).delete(deleteDurem);
module.exports = router;