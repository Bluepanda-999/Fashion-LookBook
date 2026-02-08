const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 3000 },

    style: {
      type: String,
      required: true,
      enum: ["classic", "casual", "streetwear", "sport", "business", "romantic", "minimal"]
    },
    season: {
      type: String,
      required: true,
      enum: ["winter", "spring", "summer", "autumn"]
    },
    brands: [{ type: String, trim: true }],

    // Фото 1
    image: { type: String, default: "" },

    tags: [{ type: String, trim: true }],

    likesCount: { type: Number, default: 0 },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
