const express = require("express");
const { signup,login,authMiddleware,logout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/authMiddleware', authMiddleware, (req, res) => {
  res.status(200).json({ authenticated: true });
});
module.exports = router;