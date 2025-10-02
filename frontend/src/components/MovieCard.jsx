import { FaTrashAlt } from "react-icons/fa";

const MovieCard = ({
  id,
  title,
  format,
  year,
  moviesHandler,
  clickHandler,
}) => {
  const deleteMovie = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/movies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      moviesHandler((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div
      onClick={() =>
        clickHandler((prev) => ({
          ...prev,
          status: true,
          clickedMovieCardId: id,
        }))
      }
      className="bg-white shadow-md pb-3 rounded-3xl px-3 flex flex-col items-center text-center max-w-50 duration-200 hover:scale-[1.1] cursor-pointer"
    >
      <div className="w-45 relative">
        <img
          src="/img/movie-header-template.jpg"
          className="max-w-full"
          alt="Movie image"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteMovie();
          }}
          className="absolute cursor-pointer duration-200 hover:scale-[1.1] text-xl top-3 right-1"
        >
          <FaTrashAlt />
        </button>
      </div>
      <p className="text-2xl max-w-50 opacity-80">{title}</p>
      <p className="mt-2 opacity-60">{format}</p>
      <p className="mt-2 opacity-60">{year}</p>
    </div>
  );
};

export default MovieCard;
