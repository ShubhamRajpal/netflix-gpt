import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { addGPTMovieResults } from "../utils/gptSlice";
import useSearchTMDBMovies from "../hooks/useSearchTMDBMovies";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example results given ahead. Example result : Gaddar2, Sholay, Don, Koi Mil gya, Raaz";

    // Make an API call to GPT API and get movie results
    const gptresults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptresults.choices) {
      // Do Error handling
    }

    console.log(gptresults.choices?.[0]?.message?.content);

    const gptMovies = gptresults.choices?.[0]?.message?.content.split(",");

    // Since fetch is an async operation this map function will not wait for the API calls to complete so we will use Promise.all()
    // For each movie I'll call Tmdb search api to get movie info
    const promiseArray = gptMovies.map((movie) => useSearchTMDBMovies(movie)); // this result into array of 5 promises [Promise, Promise, Promise, Promise, Promise]

    //After all promise results are resolved I'll get an array
    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGPTMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="flex justify-center pt-[12%]">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}>
        <input
          className="p-4 m-4 col-span-9"
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="bg-red-700 p-4 text-white rounded-lg col-span-3 m-4"
          onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
