import Blog from "./../models/Blog.js";
import { json } from "express";
import { setCache, getCache, clearCache } from "./../utils/cache.js";

const postBlogs = async (req, res) => {
  const { title, content, category, imgURL } = req.body;
  const { user } = req;

  if (!title || !content || !category || !imgURL) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const newBlog = new Blog({
    title,
    content,
    category,
    imgURL,
    author: user?.id,
    slug: `temp-slug-${Date.now()}-${Math.random().toString()}`,
  });

  const savedBlog = await newBlog.save();

  savedBlog.slug = `${savedBlog?.title.replace(/ /g, "-").toLowerCase()}-${
    savedBlog._id
  }`.replace(/[^\w-]+/g, ""); //// remove everything except (A-Z, a-z, 0-9, _, -)

  await savedBlog.save();

  await clearCache();

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
    console.log(condition);
    // const cached = await getCache("blogs");
    // if (cached) {
    //   res.json({
    //     success: true,
    //     data: cached,
    //     message: "Blogs fetched successfully (from cache).",
    //   });
    // } else {
    const blogs = await Blog.find({
      $or: condition,
    })
      .populate("author", "_id name email avatar")
      .sort({ status: 1, updatedAt: -1 }); // important- status (1) is string it will sort with respect to A-Z  and updatedAt (-1) is number, it will sort with large-small number

    // await setCache("blogs", blogs); //

    res.json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully.",
    });
    // }
  } catch (error) {
    console.log("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
    });
  }
};

const fetchMyDraftBlogs = async (req, res) => {
  try {
    const { authorId } = req.query;

    const blogs = await Blog.find({
      $and: [{ status: "draft" }, { author: authorId }],
    })
      .populate("author", "_id name email avatar")
      .sort({ status: 1, updatedAt: -1 });

    res.json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully.",
    });
  } catch (error) {
    console.log("Error fetching my blogs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching my blogs",
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
    const { title, category, content, imgURL } = req.body;
    const { slug } = req.params;

    const { user } = req;
    const existingBlog = await Blog.findOne({ slug: slug });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // If anyone unauthorized opens edit page directly from URl Path and tries to update the blog then
    if (existingBlog.author.toString() !== user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    if (!title || !content || !category || !imgURL) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const EditedBlog = await Blog.findOneAndUpdate(
      { slug: slug },
      {
        title,
        category,
        content,
        imgURL,
      },
      { new: true }
    );

    // await clearCache(); //

    res.json({
      success: true,
      message: "Blog updated successfully.",
      blog: EditedBlog,
    });
  } catch (error) {
    console.log("Error updating blog", error);
  }
};

const patchPublishBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const { user } = req;

  const existingBlog = await Blog.findOne({ slug: slug });

  if (!existingBlog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  if (existingBlog.author.toString() !== user?.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to publish this blog",
    });
  }

  const published = await Blog.findOneAndUpdate(
    { slug: slug },
    {
      status: "published",
      viewCount: 0,
      publishedAt: new Date(),
    }
  );

  // await clearCache(); //

  if (published) {
    res.json({
      success: true,
      message: "Blog published successfully",
    });
  }
};

const postlikeBySlug = async (req, res) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug });
  if (blog) {
    blog.likes += 1;
    await blog.save();
    res.json({
      success: true,
      message: "like increased",
    });
  }

  // await clearCache(); //
};

export {
  postBlogs,
  fetchBlogs,
  fetchMyDraftBlogs,
  fetchBlogsBySlug,
  putEditBlogBySlug,
  patchPublishBlogBySlug,
  postlikeBySlug,
};
