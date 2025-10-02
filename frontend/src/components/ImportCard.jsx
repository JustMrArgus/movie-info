import { FaTrashAlt } from "react-icons/fa";

const ImportCard = ({ moviesHandler }) => {
  const deleteMovie = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/movies/import`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="bg-[#8c3194] shadow-md pb-3 rounded-3xl px-3 flex flex-col items-center text-center max-w-50 duration-200 hover:scale-[1.1] cursor-pointer">
      <button className="text-[2.5rem] text-white uppercase flex items-center justify-center h-full cursor-pointer duration-200 hover:scale-[1.1] hover:opacity-50 opacity-80">
        Import
      </button>
    </div>
  );
};

export default ImportCard;
