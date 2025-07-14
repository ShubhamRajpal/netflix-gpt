import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="md:px-14 py-2 px-7">
      <h1 className="text-lg md:text-2xl py-2 text-white font-bold">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex gap-2">
          {movies?.map(
            (item) =>
              item.poster_path && (
                <MovieCard key={item.id} posterPath={item.poster_path} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
