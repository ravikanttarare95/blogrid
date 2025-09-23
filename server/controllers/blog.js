import Blog from "./../models/Blog.js";

const postBlogs = async (req, res) => {
  const { title, content, category, author } = req.body;

  if (!title || !content || !category || !author) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newBlog = new Blog({
    title,
    content,
    category,
    author,
  });

  const savedBlog = await newBlog.save();

  res.json({
    success: true,
    blog: savedBlog,
    message: "Blog created successfully",
  });
};

export { postBlogs };
