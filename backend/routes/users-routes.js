const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/users-controllers");

router.post("/", usersControllers.createUser);
router.get("/", usersControllers.getUsers);
router.delete("/:userId", usersControllers.deleteUser);

module.exports = router;
