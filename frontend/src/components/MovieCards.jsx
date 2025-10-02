import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import AddMovieCard from "./AddMovieCard";
import MovieDetails from "./MovieDetails";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [isClicked, setIsClicked] = useState({
    status: false,
    clickedMovieCardId: -1,
  });

  useEffect(() => {
    const getMovies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "/api/movies?actor=&title=&search=&sort=title&order=&limit=&offset=",
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
        setMovies(result.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 w-230 gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            format={movie.format}
            moviesHandler={setMovies}
            clickHandler={setIsClicked}
          />
        ))}
        <AddMovieCard moviesHandler={setMovies} />
      </div>
      <MovieDetails isClicked={isClicked} clickHandler={setIsClicked} />
    </div>
  );
};

export default MovieCards;
