const MovieCard = ({ title, format, year }) => {
  return (
    <div className="bg-white shadow-md pb-3 rounded-3xl px-3 flex flex-col items-center text-center max-w-50 duration-200 hover:scale-[1.1] cursor-pointer">
      <div className="w-45">
        <img
          src="/img/movie-header-template.jpg"
          className="max-w-full"
          alt="Movie image"
        />
      </div>
      <p className="text-2xl max-w-50 opacity-80">{title}</p>
      <p className="mt-2 opacity-60">{format}</p>
      <p className="mt-2 opacity-60">{year}</p>
    </div>
  );
};

export default MovieCard;
