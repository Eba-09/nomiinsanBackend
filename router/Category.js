const express = require("express")
const router = express.Router();
const {getCategory, getCategories, createCategory} = require("../controller/Category");
const {getCategoryBooks} = require("../controller/book");
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory);
router.route("/book/:categoryId").get(getCategoryBooks);
module.exports = router