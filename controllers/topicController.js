const Topic = require("../models/Topic");

exports.getHotTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find({ isHot: true }).sort({ order: 1, createdAt: -1 }).limit(20);
    res.json({ success: true, topics });
  } catch (err) {
    next(err);
  }
};

// (создать топик
exports.createTopic = async (req, res, next) => {
  try {
    const { title, slug, isHot, order } = req.body;

    const exists = await Topic.findOne({ slug });
    if (exists) {
      res.status(400);
      throw new Error("Topic slug already exists");
    }

    const topic = await Topic.create({
      title,
      slug,
      isHot: isHot !== undefined ? Boolean(isHot) : true,
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({ success: true, topic });
  } catch (err) {
    next(err);
  }
};
