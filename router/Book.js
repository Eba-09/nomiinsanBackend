const express = require("express")
const {createBook,getBooks,getBook,updateBook,deleteBook} = require("../controller/book");
const router = express.Router();

const multer = require('multer');
const path = require('path');
// Multer тохиргоо
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // 'uploads' хавтсанд хадгалах
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Файлын нэрийг timestamp-тай хадгалах
    }
});
const upload = multer({ storage: storage });
router.route("/").get(getBooks);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
router.post('/', upload.single('photo'), createBook);
module.exports = router;