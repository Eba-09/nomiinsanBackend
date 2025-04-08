const express = require("express");
const {getZahialgas, getZahialga, deleteZahialga, updateZahialga, createZahialga,getUserZahialgud } = require('../controller/zahialga')
const router = express.Router();

router.route('/').get(getZahialgas).post(createZahialga);
router.route('/user').get(getUserZahialgud);
router.route('/:id').get(getZahialga).delete(deleteZahialga).put(updateZahialga);
module.exports = router