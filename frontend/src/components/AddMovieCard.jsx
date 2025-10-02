import { useState } from "react";
import { useForm } from "react-hook-form";

const AddMovieCard = ({ moviesHandler }) => {
  const [isSelected, setIsSelected] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const addMovie = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const newMovie = await response.json();

      moviesHandler((prev) =>
        [...prev, newMovie.data].sort((a, b) => a.title.localeCompare(b.title))
      );

      reset();
      setIsSelected(false);
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="bg-white shadow-md pb-3 rounded-3xl px-3 flex flex-col items-center text-center max-w-50 duration-200 hover:scale-[1.1]">
      {isSelected ? (
        <>
          <div className="w-45 relative">
            <img
              src="/img/movie-header-template.jpg"
              className="max-w-full"
              alt="Movie image"
            />
          </div>
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(addMovie)}
          >
            <input
              id="title"
              type="text"
              className="text-2xl w-[80%] opacity-80 text-center"
              placeholder="Movie's title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-400">{errors.title.message}</p>
            )}
            <select
              name="select"
              className="mt-2 opacity-60"
              defaultValue=""
              {...register("format", {
                required: "Choose movie format",
              })}
            >
              <option disabled value="">
                Movie's format
              </option>
              <option value="VHS">VHS</option>
              <option value="Blu-ray">Blu-ray</option>
              <option value="DVD">DVD</option>
            </select>
            {errors.format && (
              <p className="text-red-400">{errors.format.message}</p>
            )}
            <input
              type="number"
              placeholder="Year of release"
              className="mt-2 opacity-60 w-[73%]"
              {...register("year", {
                required: "Choose year of release",
              })}
            />
            {errors.year && (
              <p className="text-red-400">{errors.year.message}</p>
            )}
            <button className="mt-3 bg-linear-to-r text-white from-green-500 to-green-300 px-10 py-2 rounded-[2rem] cursor-pointer duration-200 hover:scale-[1.1] hover:shadow-md">
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </form>
        </>
      ) : (
        <button
          onClick={() => setIsSelected(true)}
          className="text-[10rem] flex items-center justify-center h-full cursor-pointer duration-200 hover:scale-[1.1] hover:opacity-50 opacity-80"
        >
          +
        </button>
      )}
    </div>
  );
};

export default AddMovieCard;
