const express = require("express");

const sessionController = require("../controllers/session.controller");

const router = express.Router();

router.route("/").post(sessionController.sessionsCreate);

module.exports = router;
