import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    // Những cái ng dùng có thể upload lên 1 attachment và attachment đó dc lưu trữ dưới String base 64
    attachment: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// gui len 1 obj schema bằng method là Post
export const PostModel = mongoose.model('Post', schema);

// Nếu timestamps = true thì nó auto thêm 2 filed là createdAt và updatedAt
