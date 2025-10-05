import { FaTrashAlt } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const MovieCard = ({
  id,
  title,
  format,
  year,
  moviesHandler,
  setIsCardClicked,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={() =>
          setIsCardClicked((prev) => ({
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
            onClick={openDeleteModal}
            className="absolute cursor-pointer duration-200 hover:scale-[1.1] text-xl top-3 right-1"
          >
            <FaTrashAlt />
          </button>
        </div>
        <p className="text-2xl max-w-50 opacity-80">{title}</p>
        <p className="mt-2 opacity-60">{format}</p>
        <p className="mt-2 opacity-60">{year}</p>
      </div>
      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        moviesHandler={moviesHandler}
        id={id}
        title={title}
      />
    </>
  );
};

export default MovieCard;
