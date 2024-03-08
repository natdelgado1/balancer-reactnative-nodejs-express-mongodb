const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

/* Recuperacion Password */
router.get("/passwordReset", userController.passwordResetToken);
router.patch("/passwordReset", userController.passwordReset);


/* Rutas Basicas del CRUD */
router.post("", userController.createUser);
router.get("", authenticate, userController.findAllUsers);
router.get("/:id", authenticate, userController.findUser);
router.put("/:id", userController.updateUser);
router.delete("/:id",  userController.deleteUser);



module.exports = router;