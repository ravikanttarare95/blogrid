import Navbar from "./../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./../components/BlogCard";
import { DockIcon, Heart } from "lucide-react";
import Button from "./../components/Button";
import { useNavigate } from "react-router";

function FavouriteBlogs() {
  const navigate = useNavigate();
  const [favBlogs, setFavBlogs] = useState([]);

  const loadFavBlogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/favourites`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    if (response) {
      setFavBlogs(response.data.favouriteBlogs);
    }
  };
  const onFavouriteToggle = (blogId, isFav) => {
    if (!isFav) {
      setFavBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    }
  };

  useEffect(() => {
    loadFavBlogs();
  }, []);

  return (
    <>
      <Navbar isSelected={"/favourites"} />
      <div className="p-5 pb-0 sm:pb-0 sm:p-8 flex flex-col gap-10 mt-5">
        {favBlogs.length > 0 ? (
          favBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              content={blog.content}
              status={blog.status}
              category={blog.category}
              publishedAt={blog.publishedAt}
              createdAt={blog.createdAt}
              author={blog.author}
              slug={blog.slug}
              viewCount={blog.viewCount}
              likes={blog.likes}
              imgURL={blog.imgURL}
              onFavouriteToggle={onFavouriteToggle}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
            <div className="bg-red-100 w-20 h-20 flex items-center justify-center rounded-full shadow-md mb-6">
              <Heart className="w-10 h-10 text-red-500 animate-bounce" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
              No favourites yet
            </h2>
            <p className="text-gray-600 max-w-md mb-6">
              You haven’t added any blogs to your favourites. Explore and save
              the ones you love to easily find them later!
            </p>

            <Button
              btnTitle={"Explore Blogs"}
              btnSize={"md"}
              btnVariant={"primary"}
              onBtnClick={() => {
                navigate("/");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default FavouriteBlogs;
