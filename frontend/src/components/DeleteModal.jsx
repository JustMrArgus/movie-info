const DeleteModal = ({
  isModalOpen,
  setIsModalOpen,
  moviesHandler,
  id,
  title,
}) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      className={
        isModalOpen
          ? "fixed font-lato inset-0 z-50 flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="absolute inset-0 bg-black opacity-55 z-0"></div>

      <div className="z-10 flex justify-center items-center h-full w-full">
        <div className=" bg-green-500 gap-20 text-center w-[50%] px-10 py-20 rounded-lg shadow-lg flex flex-col justify-between text-white text-2xl">
          <p>{`Do you want to delete movie: ${title}?`}</p>
          <div className="flex justify-center gap-65">
            <button
              onClick={deleteMovie}
              className="border-2 border-white p-4 rounded-xl duration-200 cursor-pointer hover:scale-[1.1]"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="border-2 border-white p-4 rounded-xl duration-200 cursor-pointer hover:scale-[1.1]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
