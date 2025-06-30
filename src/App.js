import React from "react";
import ReactDOM from "react-dom/client";

const AppLayout = () => {
  return (
    <div>
      <p className="px-6 my-6 text-3xl text-amber-700 font-bold">I'm a Netflix GPT Clone</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
