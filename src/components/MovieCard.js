import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} className="w-48 h-60"/>
    </div>
  );
};

export default MovieCard;
