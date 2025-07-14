import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const { id, original_title, overview } = movies[5];

  return (
    <div className="md:p-0 pt-[30%] bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id}/>
    </div>
  );
};

export default MainContainer;
