const express = require("express")
const {createBook,getBooks,getBook,updateBook,deleteBook} = require("../controller/book");
const {getBookZeel} = require("../controller/zeel");
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
router.post('/', upload.single('photo'), createBook);
router.route("/").get(getBooks);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

router.route("/zeel/:nomCodeId").get(getBookZeel);
module.exports = router;