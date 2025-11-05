import { Navigate } from "react-router-dom";
import useStore from "../store/store";
import MovieCards from "../components/MovieCards";

const MainPage = () => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#f7f7f7] min-h-screen h-full font-lato font-bold px-5">
      <MovieCards />
    </div>
  );
};

export default MainPage;
