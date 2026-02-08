const router = require("express").Router();
const Joi = require("joi");

const validate = require("../middleware/validateMiddleware");
const { register, login } = require("../controllers/authController");

const registerSchema = Joi.object({
  username: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "stylist").optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
