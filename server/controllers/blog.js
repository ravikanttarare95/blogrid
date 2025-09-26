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
    slug: `temp-slug-${Date.now()}-${Math.random().toString()}`,
  });

  const savedBlog = await newBlog.save();

  savedBlog.slug = `${savedBlog?.title.replace(/ /g, "-").toLowerCase()}-${
    savedBlog._id
  }`.replace(/[^\w-]+/g, "");

  await savedBlog.save();

  res.json({
    success: true,
    blog: savedBlog,
    message: "Blog created successfully",
  });
};

const fetchBlogs = async (req, res) => {
  try {
    const { authorId } = req.query;

    const condition = [{ status: "published" }];
    if (authorId) {
      condition.push({ author: authorId });
    }

    const blogs = await Blog.find({
      $or: condition,
    })
      .populate("author", "_id name email")
      .sort({ status: 1, updatedAt: -1 }); // important

    res.json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully.",
    });
  } catch (error) {
    console.log("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
    });
  }
};

export { postBlogs, fetchBlogs };
