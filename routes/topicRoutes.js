const router = require("express").Router();
const Joi = require("joi");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");

const { getHotTopics, createTopic } = require("../controllers/topicController");

const topicSchema = Joi.object({
  title: Joi.string().max(80).required(),
  slug: Joi.string().max(80).required(),
  isHot: Joi.boolean().optional(),
  order: Joi.number().optional()
});

router.get("/hot", getHotTopics);

// опционально, только stylist
router.post("/", auth, role(["stylist"]), validate(topicSchema), createTopic);

module.exports = router;
