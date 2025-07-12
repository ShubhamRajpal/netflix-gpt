import { API_OPTIONS } from "../utils/constants";

const useSearchTMDBMovies = async (movie) => {
    const response = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const data = await response.json();

    return data.results;
  };

  export default useSearchTMDBMovies;