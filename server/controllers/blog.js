import Blog from "./../models/Blog.js";
import jwt from "jsonwebtoken";

const postBlogs = async (req, res) => {
  const { title, content, category, author } = req.body;
  const { authorization } = req.headers;

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  if (!title || !content || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newBlog = new Blog({
    title,
    content,
    category,
    author: decodedToken.id,
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

const fetchBlogsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug: slug }).populate(
      "author",
      "_id name email"
    );
    res.json({
      success: true,
      message: "Blog fetched Successfully.",
      blog: blog,
    });
  } catch (error) {
    console.log(error);
  }
};

const putEditBlogBySlug = async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const { slug } = req.params;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const EditedMovie = await Blog.findOneAndUpdate(
      { slug: slug },
      {
        title,
        category,
        content,
      }
    );
    //  ({ slug: slug });
    res.json({
      success: true,
      message: "Blog updated successfully.",
      blog: EditedMovie,
    });
  } catch (error) {
    console.log("Error updating blog", error);
  }
};

const patchPublishBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const published = await Blog.updateOne(
    { slug: slug },
    { status: "published" }
  );

  if (published) {
    res.json({
      success: true,
      message: "Blog published successfully",
    });
  }
};
export {
  postBlogs,
  fetchBlogs,
  fetchBlogsBySlug,
  putEditBlogBySlug,
  patchPublishBlogBySlug,
};
