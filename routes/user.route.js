const express = require('express')
const users = require("../controllers/users.controllers.js")

const router = express.Router();

router.route("/login").get(users.login);
router.route("/register").post(users.register);

module.exports = router