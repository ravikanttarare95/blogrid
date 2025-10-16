import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./../components/BlogCard";
import { Heart } from "lucide-react";
import Button from "./../components/Button";
import { useNavigate } from "react-router";
import { getCurrentUser } from "./../utils";
import BlogCardSkeleton from "./../components/BlogCardSkeleton";

function FavouriteBlogs() {
  const navigate = useNavigate();
  const [favBlogs, setFavBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs/favourites`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response) {
        setFavBlogs(response.data.favouriteBlogs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onFavouriteToggle = (blogId, isFav) => {
    if (!isFav) {
      setFavBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    }
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return navigate("/login");

    loadFavBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar isSelected={"/favourites"} />
        <div className="p-5 pb-0 sm:pb-0 sm:p-8 flex flex-col gap-10 my-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar isSelected={"/favourites"} />
      <div className="p-5 pb-0 sm:pb-0 sm:p-8 flex flex-col gap-10 my-5">
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
              isFavourite={favBlogs.some((fav) => fav._id === blog._id)}
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
      <Footer />
    </>
  );
}

export default FavouriteBlogs;
