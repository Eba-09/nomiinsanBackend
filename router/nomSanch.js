const express = require("express");
const {getSanchud, getSanch, getOneSanch, sanchRegister,sanchLogin, deleteSanch, updateSanch} = require('../controller/nomiinSanch')
const router = express.Router();
router.route('/').get(getSanchud).post(sanchRegister);
router.route('/:id').delete(deleteSanch).put(updateSanch);

//login hiih
const { authenticate } = require('../middleware/authMiddleware');
router.get('/me', authenticate, getOneSanch);
router.route('/login').post(sanchLogin);
router.route('/:id').get(getSanch);
module.exports = router