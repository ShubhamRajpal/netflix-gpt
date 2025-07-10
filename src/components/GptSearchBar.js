import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="flex justify-center pt-[12%]">
      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="bg-red-700 p-4 text-white rounded-lg col-span-3 m-4">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
