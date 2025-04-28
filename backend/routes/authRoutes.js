const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/register", authController.register);
router.post("/login", authController.login);

// check-username은 반드시 이 위에 -> 중복검색 오류남
router.get("/users/check-username", userController.checkUsername);

router.post("/users/verify-password", userController.verifyPassword);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
