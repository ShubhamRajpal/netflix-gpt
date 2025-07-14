const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] md:px-16 px-8 absolute w-screen aspect-video bg-gradient-to-r from-black">
      <h1 className="md:text-6xl text-lg font-bold text-white">{title}</h1>
      <p className="py-2 text-lg w-3/5 text-white hidden md:inline-block">{overview}</p>
      <div className="flex justify-start py-4">
        <button className="flex justify-between bg-white text-black md:py-2 md:px-8 py-1 px-3 w-34 fill-black rounded hover:bg-opacity-80">
          <svg
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
          <span className="text-xl px-2 ">Play</span>
        </button>
        <button className="md:flex hidden  mx-2 justify-between text-white py-2 px-6 w-34 fill-white rounded bg-gray-500 bg-opacity-50">
          <svg
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          <span className="text-xl px-2">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
