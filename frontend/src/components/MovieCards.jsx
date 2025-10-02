import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import AddMovieCard from "./AddMovieCard";
import MovieDetails from "./MovieDetails";
import Search from "./Search";
import ImportCard from "./ImportCard";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [isClicked, setIsClicked] = useState({
    status: false,
    clickedMovieCardId: -1,
  });

  const [titleParam, setTitleParam] = useState("");
  const [actorParam, setActorParam] = useState("");
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `/api/movies?actor=${actorParam}&title=${titleParam}&search=${searchParam}&sort=title&order=&limit=&offset=`,
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
  }, [titleParam, actorParam, searchParam]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-30">
      <div className="max-w-[920px] flex flex-col gap-8 font-lato">
        <Search
          titleParam={titleParam}
          setTitleParam={setTitleParam}
          actorParam={actorParam}
          setActorParam={setActorParam}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />

        <div className="grid grid-cols-4 gap-5">
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
          <ImportCard moviesHandler={setMovies} />
        </div>
      </div>

      <MovieDetails isClicked={isClicked} clickHandler={setIsClicked} />
    </div>
  );
};

export default MovieCards;
