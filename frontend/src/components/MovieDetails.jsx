import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const MovieDetails = ({ isCardClicked, setIsCardClicked }) => {
  const [movie, setMovie] = useState({
    title: "",
    format: "",
    year: -1,
    actors: [],
  });

  useEffect(() => {
    if (!isCardClicked.status || isCardClicked.clickedMovieCardId === -1)
      return;

    const getMovies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `/api/movies/${isCardClicked.clickedMovieCardId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch: ", response.status);
          return;
        }
        const result = await response.json();
        setMovie(result.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getMovies();
  }, [isCardClicked]);

  const listActors = () => {
    let actorsList = "";

    movie.actors.map((actor) => {
      actorsList += actor.name + ", ";
    });
    actorsList = actorsList.slice(0, -2);

    return actorsList;
  };

  const closeModal = () => {
    setIsCardClicked((prev) => ({ ...prev, status: false }));
  };

  return (
    <div
      className={
        isCardClicked.status
          ? "fixed font-lato inset-0 z-50 flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="absolute inset-0 bg-black opacity-55 z-0"></div>

      <div className="relative z-10 flex justify-center items-center h-full w-full">
        <div className="bg-white w-[50%] p-5 rounded-lg shadow-lg flex justify-between">
          {movie && (
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl mb-5">{movie.title}</h2>
              <div>Format: {movie.format}</div>
              <div>Year of release: {String(movie.year)}</div>
              <p>Actors: {listActors()}</p>
            </div>
          )}

          <div className="w-100 relative">
            <img
              src="/img/movie-header-template.jpg"
              alt="Movie template image"
              className="max-w-full"
            />
            <RxCross1
              onClick={closeModal}
              className="absolute top-1 right-1 text-xl duration-200 hover:scale-[1.1] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
