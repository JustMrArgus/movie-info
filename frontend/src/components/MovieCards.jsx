import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import AddMovieCard from "./AddMovieCard";
import MovieDetails from "./MovieDetails";
import Search from "./Search";
import ImportCard from "./ImportCard";
import MessageModal from "./MessageModal";
import TableStats from "./TableStats";

const MovieCards = () => {
  const [movies, setMovies] = useState([]);
  const [isCardClicked, setIsCardClicked] = useState({
    status: false,
    clickedMovieCardId: -1,
  });

  const [titleParam, setTitleParam] = useState("");
  const [actorParam, setActorParam] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [modalState, setModalState] = useState({
    message: "",
    isOpen: false,
    type: "error",
  });

  const [allMoviesCount, setAllMoviesCount] = useState(0);
  const [importedMoviesCount, setImportedMoviesCount] = useState(0);
  const [addedMoviesCount, setAddedMoviesCount] = useState(0);
  const [deletedMoviesCount, setDeletedMoviesCount] = useState(0);

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
        setAllMoviesCount(result.data.length);
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

        <div className="grid sm:grid-cols-4 gap-5 grid-cols-2">
          <AddMovieCard
            moviesHandler={setMovies}
            setModalState={setModalState}
            setAllMoviesCount={setAllMoviesCount}
            setAddedMoviesCount={setAddedMoviesCount}
          />
          <ImportCard
            moviesHandler={setMovies}
            setModalState={setModalState}
            setAllMoviesCount={setAllMoviesCount}
            setImportedMoviesCount={setImportedMoviesCount}
          />
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              format={movie.format}
              moviesHandler={setMovies}
              setModalState={setModalState}
              setIsCardClicked={setIsCardClicked}
              setAllMoviesCount={setAllMoviesCount}
              setDeletedMoviesCount={setDeletedMoviesCount}
            />
          ))}
        </div>
      </div>

      <TableStats
        allMoviesCount={allMoviesCount}
        addedMoviesCount={addedMoviesCount}
        importedMoviesCount={importedMoviesCount}
        deletedMoviesCount={deletedMoviesCount}
      />

      <MovieDetails
        isCardClicked={isCardClicked}
        setIsCardClicked={setIsCardClicked}
      />
      <MessageModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default MovieCards;
