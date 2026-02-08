const router = require("express").Router();
const Joi = require("joi");

const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");

const updateSchema = Joi.object({
  username: Joi.string().min(2).max(40).optional(),
  bio: Joi.string().max(500).allow("").optional(),
  avatar: Joi.string().allow("").optional(),
  password: Joi.string().min(6).optional()
});

router.get("/profile", auth, getProfile);
router.put("/profile", auth, validate(updateSchema), updateProfile);

module.exports = router;
