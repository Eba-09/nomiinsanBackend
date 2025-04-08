const express = require("express");
const {getTorguulis, getTorguuli, deleteTorguuli, updateTorguuli, createTorguuli} = require('../controller/torguuli')
const router = express.Router();
//torguuli
router.route('/').get(getTorguulis).post(createTorguuli);
router.route('/:id').get(getTorguuli).delete(deleteTorguuli).put(updateTorguuli);

module.exports = router