import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import MovieCards from "../components/MovieCards";

const MainPage = () => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#f7f7f7] h-full font-lato font-bold">
      <MovieCards />
    </div>
  );
};

export default MainPage;
