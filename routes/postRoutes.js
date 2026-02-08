const router = require("express").Router();
const Joi = require("joi");

const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require("../controllers/postController");

const postSchema = Joi.object({
  title: Joi.string().max(120).required(),
  description: Joi.string().max(3000).required(),
  style: Joi.string().valid("classic", "casual", "streetwear", "sport", "business", "romantic", "minimal").required(),
  season: Joi.string().valid("winter", "spring", "summer", "autumn").required(),
  brands: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
  tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).optional(),
  likesCount: Joi.number().optional()
});

router.post("/", auth, upload.single("image"), validate(postSchema), createPost);
router.get("/", auth, getPosts);
router.get("/:id", auth, getPostById);
router.put("/:id", auth, upload.single("image"), validate(postSchema.fork(["title","description","style","season"], (s)=>s.optional())), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
