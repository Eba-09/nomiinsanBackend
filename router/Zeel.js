const express = require("express");
const {getZeels,getZeel, getUserZeels ,getSanchZeels, deleteZeel, updateZeel, createZeel} = require('../controller/zeel')
const router = express.Router();

router.route('/').get(getZeels).post(createZeel);
router.route('/:id').get(getZeel).delete(deleteZeel).put(updateZeel);
module.exports = router