const express = require("express");
const {getUser, userRegister,getOneUser ,deleteUser,getUserdata, updateUser, userLogin} = require('../controller/Users');
const {getUserTorguulis, createTorguuli} = require("../controller/torguuli")
const {getUserZahialga, createZahialga} = require("../controller/zahialga");
const {getUserZeels} = require("../controller/zeel");
const router = express.Router();
router.route('/').get(getUser).post(userRegister);
router.route('/:id').delete(deleteUser).put(updateUser)
//login hiih
const { authenticate } = require('../middleware/authMiddleware');
router.get('/me', authenticate, getOneUser);
router.route('/login').post(userLogin);
router.route("/torguuli/:userCodeId").get(getUserTorguulis).post(createTorguuli);
router.route("/zahialga/:userCodeId").get(getUserZahialga).post(createZahialga);
router.route("/zeel/:userCodeId").get(getUserZeels);
router.route('/:id').get(getUserdata);
module.exports = router