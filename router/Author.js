const express = require("express")
const  router = express.Router();
const {getAuthors, createAuthor, getAuthor, deleteAuthor, updateAuthor} = require("../controller/Author");
const {getAuthorBooks} = require("../controller/book")
router.route("/").get(getAuthors).post(createAuthor)
router.route("/book/:authorIdId").get(getAuthorBooks)
router.route("/:id").get(getAuthor).delete(deleteAuthor).put(updateAuthor)
module.exports = router;