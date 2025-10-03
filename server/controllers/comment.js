import Comment from "./../models/Comment.js";
import Blog from "./../models/Blog.js";

const postCommentBySlug = async (req, res) => {
  const { slug } = req.params;
  const { user } = req;
  const { content } = req.body;

  const blog = await Blog.findOne({ slug });
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  const comment = new Comment({
    content,
    user: user.id,
    blog: blog._id,
  });

  await comment.save();

  if (comment) {
    res.json({
      success: true,
      message: "Your comment added successfully",
      comment,
    });
  }
};

const getCommentBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const comments = await Comment.find({ blog: blog._id }).populate(
      "user",
      "name email"
    );
    if (comments) {
      res.json({
        success: true,
        comments,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { postCommentBySlug, getCommentBySlug };
