const Post = require("../models/Post");

function canEdit(user, post) {
  return user.role === "stylist" || String(post.author) === String(user._id);
}

// POST /api/posts
exports.createPost = async (req, res, next) => {
  try {
    const { title, description, style, season, brands, tags } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const post = await Post.create({
      title,
      description,
      style,
      season,
      brands: Array.isArray(brands) ? brands : (brands ? String(brands).split(",").map(s => s.trim()).filter(Boolean) : []),
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(",").map(s => s.trim()).filter(Boolean) : []),
      image,
      author: req.user._id
    });

    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

// GET /api/posts (private) supports filters/выборка
exports.getPosts = async (req, res, next) => {
  try {
    const { style, season, brand, sort, limit } = req.query;

    const q = { author: req.user._id };

    if (style) q.style = style;
    if (season) q.season = season;
    if (brand) q.brands = brand;

    let query = Post.find(q).populate("author", "username role");

    if (sort === "popular") query = query.sort({ likesCount: -1, createdAt: -1 });
    else query = query.sort({ createdAt: -1 });

    const lim = limit ? Math.min(Number(limit), 50) : 50;
    const posts = await query.limit(lim);

    res.json({ success: true, count: posts.length, posts });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username role");
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    // доступ только если свой пост или стилист
    if (!canEdit(req.user, post)) {
      res.status(403);
      throw new Error("Forbidden");
    }

    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    if (!canEdit(req.user, post)) {
      res.status(403);
      throw new Error("Forbidden");
    }

    const { title, description, style, season, brands, tags, likesCount } = req.body;

    if (title !== undefined) post.title = title;
    if (description !== undefined) post.description = description;
    if (style !== undefined) post.style = style;
    if (season !== undefined) post.season = season;

    if (brands !== undefined) {
      post.brands = Array.isArray(brands) ? brands : String(brands).split(",").map(s => s.trim()).filter(Boolean);
    }

    if (tags !== undefined) {
      post.tags = Array.isArray(tags) ? tags : String(tags).split(",").map(s => s.trim()).filter(Boolean);
    }

    if (req.file) post.image = `/uploads/${req.file.filename}`;
    if (likesCount !== undefined) post.likesCount = Number(likesCount);

    await post.save();

    res.json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    if (!canEdit(req.user, post)) {
      res.status(403);
      throw new Error("Forbidden");
    }

    await post.deleteOne();
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
